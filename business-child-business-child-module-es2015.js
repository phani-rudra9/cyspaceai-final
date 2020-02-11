(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["business-child-business-child-module"],{

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.html":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.html ***!
  \*************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <p class=\"title3 text-center\" id=\"section-24\">ITSM HEALTHCHECK</p>\n\n<div class=\"row\" id=\"section-29\">\n  <div class=\"col-md-6 mb\">\n    <img src=\"assets/advisory.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n\n  </div>\n  <div class=\"col-md-6\">\n    <h3 class=\"homep\">Our Advisory includes below services!!</h3>\n    <ul class=\"adv\">\n      <li>\n          deliver quality service that meets business objectives\n      </li>\n      <li>cut costs and risk as projects are on time and within scope</li>\n      <li>\n          adapt IT services to changing business and customer needs\n      </li>\n      <li>optimize desired business results</li>\n      <li>\n          make the right decisions so that IT adds value to the business.\n      </li>\n    </ul>\n   \n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-25\">SOFTWARE LICENSED MANAGED SERVICES</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/software.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n\n  </div>\n  <div class=\"col-md-6\">\n      <ul class=\"adv\">\n       <li>deliver quality service that meets business objectives </li>\n       <li>cut costs and risk as projects are on time and within scope</li>\n       <li>adapt IT services to changing business and customer needs</li>\n       <li>optimize desired business results</li>\n       <li>make the right decisions so that IT adds value to the business.</li>\n      </ul>\n    \n  </div>\n</div>\n -->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/business/business.component.html":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/business/business.component.html ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p class=\"title3\" id=\"section-34\">Business Service & Management</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12 title\">\n    <img src=\"../../../../assets/cyspace-images//Business-service-management/business-service-management.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12 title1\">\n    <p class=\"homep\">\n      Our Business Service Management solutions boost the capacity and strength of organizations to withstand the resilience of business applications. Our understanding and methodology help in identifying the potential challenges in aligning your IT elements to the goals of your business. Our solutions provide ease of access, scalability, and security of business applications using tools and accelerators, analytics and automation network.\n    </p>\n  </div>\n</div>\n\n\n\n\n<p class=\"title4\" id=\"section-36\">IT OPTIMISATION</p>\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/cy1.jpg\" class=\"img-fluid\" width=\"100%\">\n\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      IT process optimization is a practice that goes well beyond programming techniques, software domains, and\n      hardware knowledge. It’s a strategic element for modern organizations, increasingly dependent on the use of\n      information technology in their operations, in search of results. In this context, the goal of IT process\n      optimization has a much more predictive character than just providing technical support and answering calls.\n      It’s critical that IT managers see the organization’s strategic objectives and how they add value to the\n      solutions the organization delivers to external and internal customers, so they’re always satisfied.\n    </p>\n    <h1 class=\"text-center color\">The professional approach to security!</h1>\n\n  </div>\n</div>\n\n<hr class=\"bdr\">\n\n  <br>\n  <p class=\"title3\" id=\"section-1\">HEALTH MONITORING</p>\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/Health Monitoring.jpg\"  width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          Technology is everywhere. It has enhanced the way we do business, the way\n          we communicate; it streamlines processes, tracks inventory, monitors systems,\n          behaviors. The applications are endless and when working properly, you can almost\n          forget it’s there. However, when it’s not working properly, the effects are felt\n          immediately and can ripple through your business with detrimental consequences.\n          When approaching technology, the focus is almost always on acquiring the hardware\n          and/or software itself. It’s tangible, it’s exciting, and it serves a clear, defined\n          purpose. You can look at it, evaluate it, and plan how you will use it to enhance your\n          business.\n      </p>\n      <p class=\"homep\">\n          System health monitoring is a set of activities undertaken to maintain a\n          system in operable condition and may be limited to an observation of current system\n          states, with maintenance and repair being prompted by these observations. It is a\n          safeguard that not only protects your investment but also takes the guesswork out of\n          troubleshooting and diagnosing potential issues, lessening the burden on IT staff.\n          Think of it as the thread that weaves through your fabric and helps hold it together.\n          Without it, you’re leaving your technology and your business exposed to potential\n          issues that could easily have been avoided.\n      </p>\n    </div>\n  </div>\n  <p class=\"title3\" id=\"section-2\">SERVICE MODELING</p>\n\n  <div class=\" row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/service-level-modeling.jpg\" class=\"img-fluid imgmarsm\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          Service-oriented modeling is the discipline of modeling business and\n          software systems, for the purpose of designing and specifying service-oriented\n          business systems within a variety of architectural styles and paradigms, such as\n          application architecture, service-oriented architecture, microservices, and cloud\n          computing.\n      </p>\n      <p class=\"homep\">\n          Service-oriented modeling typically strives to create models that provide a\n          comprehensive view of the analysis, design, and architecture of all &#39;Software Entities&#39;\n          in an organization, which can be understood by individuals with diverse levels of\n          business and technical understanding. Service-oriented modeling typically\n          encourages viewing software entities as &#39;assets&#39; (service-oriented assets) and refers\n          to these assets collectively as &#39;services.\n      </p>\n    </div>\n  </div>\n\n  <p class=\"title3\" id=\"section-3\">CUSTOMER EXPERIENCE</p>\n\n  <div class=\"health-monatring row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/customer-experience.jpg\" class=\"img-fluid\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          Customer experience is defined by interactions between a customer and an\n          organization throughout their business relationship. An interaction can include\n          \n          Internal\n          \n          awareness, discovery, cultivation, advocacy, purchases, and service. We will allow\n          your business to gain valuable insight into the user experience of your website or e-\n          commerce website – so you can proactively pinpoint and fix problems.\n      </p>\n    </div>\n  </div>\n  <p class=\"title3\" id=\"section-4\">SOFTWARE LICENSE MANAGEMENT</p>\n\n  <div class=\"health-monatring row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/software-license.jpg\" class=\"img-fluid\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          Software license management refers to the software tools or processes used\nby an organization to control and document where and how the company&#39;s software\nproducts are able to run in order to enforce and ensure compliance with software\nlicenses (also known as an End-User License Agreement, or EULA). Software\nlicense management, or SLM, is part of overall software asset management (SAM)\ncapability and involves the process of reducing, documenting, and controlling total IT\ncosts. In short, SLM is a plan to help you monitor and maintain all your organization’s\nvarious software licenses. CySpace Global™ shall help you keep track, manage your\nlicenses wherever and whenever needed. It is imperative for all organizations to\ninvest in this to avoid long term losses.\n      </p>\n    </div>\n  </div>\n\n  <p class=\"title3\" id=\"section-12\">SERVICE LEVEL ANALYTICS</p>\n\n  <div class=\"health-monatring row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/service-level-analytics.jpg\" class=\"img-fluid\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          A service-level agreement (SLA) defines the level of service expected by a\ncustomer from a supplier, laying out the metrics by which that service is measured,\nand the remedies or penalties, if any, should the agreed-on service levels not be\nachieved. SLAs are an integral part of an IT vendor contract. An SLA pulls together\ninformation on all the contracted services and their agreed-upon expected reliability\ninto a single document. They clearly state metrics, responsibilities, and expectations\nso that, in the event of issues with the service, neither party can plead ignorance. It\nensures both sides have the same understanding of requirements.\n      </p>\n    </div>\n  </div>\n\n  <p class=\"title3\" id=\"section-11\">IT SERVICE MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <img src=\"../../../../assets/cyspace-images/Business-service-management/it-service-management/it-service-management.jpg\" class=\"img-fluid\" width=\"100%\">\n\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      ITSM (or IT Service Management) refers to all the activities involved in designing, creating, delivering, supporting and managing the lifecycle of IT services.\n    </p>\n    <p class=\"homep\">\n      Well, of course it does, but what are IT services? Think of any piece of technology you use at your workplace – your laptop, the apps installed on it, the printer that your entire team uses, or the option to reset your password even after the first 15 times.\n    </p>\n    <p class=\"homep\">\n      ITSM is important for a variety of reasons. Implementing ITSM can help regularize processes through structured delivery and documentation. ITSM implementation also helps in saving costs by building a predictable IT org. Implementing ITSM has business benefits by bringing actionable IT insights to the business that help in decision making.\n    </p>\n  </div>\n</div>\n\n\n<p class=\"title3\" id=\"section-5\">SELF SERVICE SUPPORT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\".../../../../../../assets/cyspace-images/Business-service-management/it-service-management/self-service-support.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n        The customers of today aren’t like the customers of yesterday. Today’s\n        customers are savvy, self-reliant, demand convenience, and are comfortable using\n        Google to find answers to their questions. Self-service support is a blend of\n        ‘customer-initiated interaction technologies’ that enable customers to solve problems\n        themselves without reaching out to a customer care department. Self-service support\n        \n        Internal\n        \n        channels include electronic records management systems, chat, and knowledge\n        bases.\n    </p>\n    <p class=\"homep\">\n        <b>Benefits of Self-Service Support:</b>\n    </p>\n    <ul class=\"self\">\n      <li>\n          Cost Efficiency\n      </li>\n      <li>   \n               Timeliness\n        </li>\n\n      <li>   \n                Availability\n        </li>\n      <li>   \n                Empowering Customers and employees\n        </li>\n    </ul>\n   \n  </div>\n</div>\n\n<p class=\"title3\" id=\"section-6\">INCIDENT AND PROBLEM MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-service-management/Incident-problem-management.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n        Problem management and incident management are just the first stepping\n        stones toward building reliable systems.\n    </p>\n    <p class=\"homep\">\n        The main goal of incident management is to resolve the disruption as soon\n        as possible in order to restore service operations. Due to the fact that even minor\n        disruptions in service can have a huge impact on the organization, it is necessary to\n        fix incidents immediately. The process of incident management usually includes\n        recording the details of the incident and resolving it.\n    </p>\n    <p class=\"homep\">\n        The goal of problem management is to identify the root cause of the incidents\n        and try to prevent them from happening again. It might take multiple incidents before\n        problem management can have enough data to analyze what is going wrong, but if\n        undertaken correctly, it will help the problem become a “known error” and steps can\n        be put in place to correct it. While incidents like a malfunctioning mouse may not\n        result in a problem, those like repeated network outages need to be investigated.\n    </p>\n  </div>\n</div>\n<p class=\"title3\" id=\"section-7\">CHANGE AND RELEASE</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/change-and-configuration-compliance.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      Change Management is an authoritative process that governs anything that\n      potentially impacts a new or existing service. It is both the enabler of innovation and\n      protector of stability. It is first and foremost a risk management process. It is also a\n      planning process.\n    </p>\n    <p class=\"homep\">\n      If Change Management is a governance process, Release Management is an\n      action process. Under the authority of Change, Release builds, tests and releases\n      new or updated services into the production environment. Every release is\n      comprised of a single change or package of changes. Release Management is more\n      technical than Change.\n    </p>\n    <p class=\"homep\">\n      If done well, both processes will avoid unnecessary levels of bureaucracy and\nwill build a collection of change and release models that pre-define and pre-approve\nthe rigor required based on levels of risk. The more mature the processes, the\nhigher the number of standard changes.\n    </p>\n  </div>\n</div>\n<p class=\"title3\" id=\"section-8\">CMDB</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/CMDB.jpg\" class=\"img-fluid\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n        A configuration management database (CMDB) is a database that contains\nall relevant information about the hardware and software components used in an\n\nInternal\n    </p>\n    <p class=\"homep\">\norganization&#39;s IT services and the relationships between those components. A CMDB\nprovides an organized view of configuration data and a means of examining that data\nfrom any desired perspective.\n    </p>\n    <p class=\"homep\">\nAs IT infrastructure becomes more complex, the importance of tracking and\nunderstanding the information within the IT environment increases. The use of\nCMDBs is a best practice for IT leaders that need to identify and verify each\ncomponent of their infrastructure to better manage and improve it.\n    </p>\n    <p class=\"homep\">\nCMDBs provide a centralized view of IT data, which, in turn, offers IT-leaders,\nmore control over their infrastructure. A CMDB user can visualize each individual IT\ninfrastructure component -- for example, a storage device or an application running\non a server -- which reduces complexity, prevents administrative and management\nerrors and increases security.\n    </p>\n    \n  </div>\n</div>\n<p class=\"title3\" id=\"section-9\">IT ASSET</p>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-service-management/it-asset.jpg\" class=\"img-fluid\" width=\"100%\">\n    </div>\n\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n        IT asset management (information technology asset management, or ITAM)\nis a set of business practices that combines financial, inventory and contractual\nfunctions to optimize spending and support lifecycle management and strategic\ndecision-making within the IT environment.\n    </p>\n    <p class=\"homep\">\n        ITAM is about more than creating an asset inventory. It&#39;s about continually\n        using the captured asset data to maximize returns, minimize risk and drive increased\n        business value. By avoiding unnecessary asset purchases and making the best use\n        of current resources, IT asset managers can cut software licensing and support\n        costs, eliminate waste and improve efficiency.\n    </p>\n    <p class=\"homep\">\n        ITAM also helps increase the companywide understanding of IT&#39;s business\n        value, improves communications and understanding between IT and other\n        departments, enforces compliance with cybersecurity policies and regulatory\n        requirements, improves productivity through technical support, and limits overhead\n        costs of managing the IT environment.\n\n    </p>\n  </div>\n</div>\n<p class=\"title3\" id=\"section-10\">SERVICE LEVEL MANAGEMENT</p>\n\n<div class=\"row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-service-management/service-level-management.jpg\" class=\"img-fluid\" width=\"100%\">\n    </div>\n\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n        SLM is a vital process for every IT service provider organization in that it is\nresponsible for agreeing and documenting service level targets and responsibilities\nwithin SLAs and service level requirements (SLRs) for every service and related\nactivity within IT.\n</p>\n    <p class=\"homep\">\n        If these targets are appropriate and accurately reflect the requirements of the\nbusiness, then the service delivered by the service providers will align with business\nrequirements and meet the expectations of the customers and users regarding\nservice quality.\n    </p>\n    <p class=\"homep\">\n        <b>Service Level Management activities include:</b>\n    </p>\n    <ul class=\"self\">\n      <li>\n          Identifying business requirements by working with business units\n      </li>\n      <li>\n          Establishing the scope of services, timeliness, hours of operation, recovery aspects,\n          and service performance\n      </li>\n      <li>\n          Translating business requirements into IT requirements\n\n      </li>\n      <li>\n\n          Developing and maintaining a service catalog, including costs for different tiers of\n          service performance\n          \n         \n\n      </li>\n      <li>\n           Performing gap analysis between business requirements and available services.\n\n      </li>\n      <li>\n           Determining the costs related to services such that service goals satisfy business\n          needs at a price the business can afford\n      </li>\n      <li>\n           Drafting, negotiating and refining SLAs with the business units, ensuring business\n          requirements are met and agreement from all parties involved\n      </li>\n      <li>\n         Implementing SLAs\n\n      </li>\n      <li>\n          Measuring SLA performance, reporting results and adjusting as necessary\n\n      </li>\n    </ul>\n  </div>\n</div>\n\n\n\n\n\n\n\n<p class=\"title3 text-center\" id=\"section-26\">IT  OPERATIONS</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <img src=\"../../../../assets/cyspace-images/Business-service-management/IT Sec _ Operations.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      IT operations are the processes and services administered by an organization’s information technology (IT) department. As such, IT operations include administrative processes and support for hardware and software, for both internal and external clients. IT operations determine the way an organization manages software and hardware and includes other IT support, such as network administration, device management, mobile contracting and help desks of all kinds. IT operations management and IT operations analytics help an organization refine the way that IT approaches services, deployment and support and help to ensure consistency, reliability and quality of service.\n    </p>\n\n  </div>\n</div>\n\n\n<p class=\"title3 text-center\" id=\"section-13\">MANAGER OF MANAGERS</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <img src=\"../../../../assets/cyspace-images/Business-service-management/it-operations/manager-of-managers.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n        The role of a MOM has moved from basic event consolidation to correlating\n        data across IT elements to show the impact the IT organization has on business. For\n        example, very few businesses need a raw storage array service. However, they do\n        need a responsive and reliable data warehouse service that depends on servers,\n        databases, storage, network connectivity, event correlation and analysis, and\n        analytical and reporting tools. Monitoring alone includes massive amounts of event,\n        metric and logo data.\n        \n    </p>\n    <p class=\"homep\">\n        To manage end-to-end services effectively, you need to bring all your\n        monitoring data into one place. By using a manager of managers monitoring system,\n        MoM operations collect a comprehensive set of data – including events, logs, and\n        metrics – from all your point tools. With modern systems, manager of managers\n        monitoring is no longer siloed – yes, the point tools still exist, but you now have all\n        the data in a single pane of glass.\n    </p>\n  </div>\n</div>\n\n\n<p class=\"title3 text-center\" id=\"section-14\">SERVICE MODELING</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-operations/service-level-modeling.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n        Service modeling typically strives to create models that provide a\ncomprehensive view of the analysis, design, and architecture of all &#39;Software Entities&#39;\nin an organization, which can be understood by individuals with diverse levels of\nbusiness and technical understanding. Service-oriented modeling typically\nencourages viewing software entities as &#39;assets&#39; (service-oriented assets) and refers\nto these assets collectively as &#39;services.\n    </p>\n\n  </div>\n</div>\n\n\n\n\n\n<p class=\"title3 text-center\" id=\"section-15\">PROACTIVE PERFORMANCE MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-operations/proactive-performence-management.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      The goal of proactive performance management is to ensure that SLAs are\n      being met and will continue to be met. To accomplish this goal, it is necessary to\n      identify current and potential bottlenecks, inefficient or poorly performing\n      components, and potential failures. Proactive performance management is the\n      gathering of statistical data for monitoring and correcting the operation and\n      measuring the overall effectiveness of the network as well as aiding in the network\n      planning and analysis process.\n    </p>\n    <p class=\"homep\">\n      Performance management involves establishing a set of performance\nobjectives for resources and addressing the following steps:\n    </p>\n\n  </div>\n</div>\n\n\n\n\n\n\n<p class=\"title3 text-center\" id=\"section-16\">SYSTEM MONITORING</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-operations/system-monitoring.jpg\" class=\"img-fluid\" width=\"100%\">\n\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      If done well, both processes will avoid unnecessary levels of bureaucracy and\n      will build a collection of change and release models that pre-define and pre-approve\n      the rigor required based on levels of risk. The more mature the processes, the\n      higher the number of standard changes.\n    </p>\n    <ul class=\"adv self\">\n      <li>Acceptable delivery speeds\n      </li>\n      <li>Constant availability\n      </li>\n      <li>Preventative maintenance\n      </li>\n      <li>Software version monitoring and patching\n      </li>\n      <li>Intrusion detection\n      </li>\n      <li>Data integrity\n      </li>\n      <li>Security monitoring\n      </li>\n      <li>Attack mitigation\n      </li>\n      <li>Virus prevention and detection\n      </li>\n\n    </ul>\n\n  </div>\n</div>\n\n<p class=\"title3 text-center\" id=\"section-17\">CAPACITY MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-operations/capacity-management.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      Capacity Management ensures proper utilization of available resources and\nmakes future capacity requirements available in a cost-effective and timely manner.\nThe main purpose of capacity management is to make sure that the capacity of the\nIT services and infrastructure can meet the agreed-upon requirements of capacity\nand performance in a manner that is both timely and cost-effective. It also ensures\nthat IT is sized in an optimum and cost-effective manner by producing and regularly\nupgrading capacity plan.\n    </p>\n    <p class=\"homep\">\n      The capacity management process should cover the operational and\ndevelopment environment which includes the hardware, networking equipment,\nperipherals, software, and human resources. Capacity management makes sure that\nthe IT resources and planned and scheduled to deliver a level of service which is\nconsistent and matched to the present and future needs of the business.\n    </p>\n\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-18\">APPLICATION PERFORMANCE MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-operations/aplication-performence-management.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      Application performance management (APM) is a practice within systems\nmanagement that targets managing and tracking the availability and efficiency of\nsoftware applications. APM involves translating IT metrics into business meaning.\n    </p>\n    <p class=\"homep\">\n      It examines the workflow and the associated IT tools that are deployed to\nanalyze, identify and report application performance concerns to make sure the\nexpectations of businesses and end-users are met. Application performance signifies\nhow quickly transactions are accomplished or details are sent to end-users using an\napplication.\n    </p>\n\n  </div>\n</div>\n\n\n<p class=\"title3 text-center\" id=\"section-28\">IT PROCESS AUTOMATION</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n  <img src=\"../../../../assets/cyspace-images/Business-service-management/it-process-automation/it-process-automation.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      As IT environments increase in complexity and the amount of data, devices, systems and platforms expand to become beyond the management capabilities of IT Ops teams, putting in place automated operations across IT Ops processes becomes essential. IT process automation (ITPA), is the ability to orchestrate and integrate tools, people and processes through workflow.\n    </p>\n    <h1 class=\"text-center color\">Automate-Analyze-respond</h1>\n  </div>\n</div>\n<hr class=\"bdr\">\n\n  <br>\n<p class=\"title3 text-center\" id=\"section-20\">WORKLOAD & JOB SCHEDULING</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-process-automation/workload-and-job-scheduling.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      Workload automation software is used to streamline and automate IT\nprocesses related to job scheduling, batch processing or other repetitive tasks.\nThese tools centralize control over business processes across mainframe, cloud, and\ncloud computing systems.\n    </p>\n    <p class=\"homep\">\n      Companies use workload automation software to manage, schedule, and\noptimize workload processes. These tools can streamline business processes and, in\neffect, simplify planning, increase efficiency, and cut costs.\n    </p>\n\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-21\">CONFIGURATION AUTOMATION</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-process-automation/configuration.jpg\" class=\"img-fluid\" width=\"100%\">\n\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      Without automation, building and maintaining large-scale modern IT systems\ncan be a resource-intensive undertaking and can lead to increased risk due to\nmanual error. Configuration and resource management is an automated method for\nmaintaining computer systems and software in a known, consistent state.\n    </p>\n    <p class=\"homep\">\n      The primary benefit of configuration management is the consistency of\nsystems and software. With configuration management, you no longer guess or hope\nthat a configuration is current. It is correct because the configuration management\nsystem ensures that it is correct.\n    </p>\n    <p class=\"homep\">\n      When combined with automation, configuration management can improve\nefficiency because manual configuration processes are replaced with automated\nprocesses. This also makes it possible to manage more targets with the same or\neven fewer resources.\n    </p>\n\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-22\">PROCESS ORCHESTRATION</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-process-automation/processed-orchestration.jpg\" class=\"img-fluid\" width=\"100%\">\n\n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">\n      Process Orchestration provides a tool infrastructure to model and design\n      business processes - from the overall process flow and the sequence of activities up\n      to the interfaces and data types that are needed to integrate SAP systems and\n      external systems. Process Orchestration is the means by which a process is\n      executed and monitored and managed throughout its lifecycle.\n    </p>\n    \n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-23\">MANAGED FILE TRANSFER</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-process-automation/managed-file-transfer.jpg\" class=\"img-fluid\" width=\"100%\">\n\n  </div>\n  <div class=\"col-md-12\">\n\n   <p class=\"homep\">\n      Managed file transfer (MFT) is a type of software used to provide secure\n      internal, external and ad-hoc data transfers through a network. MFT software and\n      products are designed to help organizations meet the increasing security, compliance\n      and operational demands of moving information.\n   </p>\n  </div>\n</div>\n\n\n\n\n\n\n\n\n\n<p class=\"title3 text-center\" id=\"section-24\">ITSM HEALTHCHECK</p>\n\n<div class=\"row\" id=\"section-29\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/Advisory services.jpg\" class=\"img-fluid\" width=\"100%\" height=\"450px !important\"> \n  </div>\n  <div class=\"col-md-12\">\n    <p class=\"homep\">Our Advisory includes below services!!</p>\n    <ul class=\"adv self\">\n      <li>\n          deliver quality service that meets business objectives\n      </li>\n      <li>cut costs and risk as projects are on time and within scope</li>\n      <li>\n          adapt IT services to changing business and customer needs\n      </li>\n      <li>optimize desired business results</li>\n      <li>\n          make the right decisions so that IT adds value to the business.\n      </li>\n    </ul>\n   \n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-25\">SOFTWARE LICENSE MATURITY ASSESSMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n      <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/software-license.jpg\" class=\"img-fluid\" width=\"100%\">\n  </div>\n  <div class=\"col-md-12\">\n      <P class=\"homep\">Are you minimizing IT costs? Are you worried about an audit? Take our SAM maturity assessment, view your results, and find out how you can lower the costs of unused software, reclaim and reuse business software licenses and feel safe and compliant when audit time comes around.</P>\n      <p class=\"color\">\n          BUILD THE CULTURE OF RESILIENCY\n            </p>\n  </div>\n  \n</div>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itmanagement/itmanagement.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itmanagement/itmanagement.component.html ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <p class=\"title3 text-center\" id=\"section-11\">IT SERVICE MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <img src=\"assets/it-service-management.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      ITSM (or IT Service Management) refers to all the activities involved in designing, creating, delivering, supporting and managing the lifecycle of IT services.\n    </p>\n    <p class=\"homep\">\n      Well, of course it does, but what are IT services? Think of any piece of technology you use at your workplace – your laptop, the apps installed on it, the printer that your entire team uses, or the option to reset your password even after the first 15 times.\n    </p>\n    <p class=\"homep\">\n      ITSM is important for a variety of reasons. Implementing ITSM can help regularize processes through structured delivery and documentation. ITSM implementation also helps in saving costs by building a predictable IT org. Implementing ITSM has business benefits by bringing actionable IT insights to the business that help in decision making.\n    </p>\n  </div>\n</div> -->\n\n\n<!-- <p class=\"title3 text-center\" id=\"section-5\">SELF SERVICE SUPPORT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/business-service-management.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n        The customers of today aren’t like the customers of yesterday. Today’s\n        customers are savvy, self-reliant, demand convenience, and are comfortable using\n        Google to find answers to their questions. Self-service support is a blend of\n        ‘customer-initiated interaction technologies’ that enable customers to solve problems\n        themselves without reaching out to a customer care department. Self-service support\n        \n        Internal\n        \n        channels include electronic records management systems, chat, and knowledge\n        bases.\n    </p>\n    <p class=\"homep\">\n        Benefits of Self-Service Support:\n    </p>\n    <ul class=\"self\">\n      <li>\n          Cost Efficiency\n      </li>\n      <li>          Timeliness\n        </li>\n      <li>           Availability\n        </li>\n      <li>           Empowering Customers and employees\n        </li>\n    </ul>\n   \n  </div>\n</div>\n\n<p class=\"title3 text-center\" id=\"section-6\">INCIDENT AND PROBLEM MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/it-assets.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n        Problem management and incident management are just the first stepping\n        stones toward building reliable systems.\n    </p>\n    <p class=\"homep\">\n        The main goal of incident management is to resolve the disruption as soon\n        as possible in order to restore service operations. Due to the fact that even minor\n        disruptions in service can have a huge impact on the organization, it is necessary to\n        fix incidents immediately. The process of incident management usually includes\n        recording the details of the incident and resolving it.\n    </p>\n    <p class=\"homep\">\n        The goal of problem management is to identify the root cause of the incidents\n        and try to prevent them from happening again. It might take multiple incidents before\n        problem management can have enough data to analyze what is going wrong, but if\n        undertaken correctly, it will help the problem become a “known error” and steps can\n        be put in place to correct it. While incidents like a malfunctioning mouse may not\n        result in a problem, those like repeated network outages need to be investigated.\n    </p>\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-7\">CHANGE AND RELEASE</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/capacity-management1.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n        Technology is everywhere. It has enhanced the way we do business, the way\n        we communicate; it streamlines processes, tracks inventory, monitors systems,\n        behaviors. The applications are endless and when working properly, you can almost\n        forget it’s there. However, when it’s not working properly, the effects are felt\n        immediately and can ripple through your business with detrimental consequences.\n        When approaching technology, the focus is almost always on acquiring the hardware\n        and/or software itself. It’s tangible, it’s exciting, and it serves a clear, defined\n        purpose. You can look at it, evaluate it, and plan how you will use it to enhance your\n        business.\n    </p>\n    <p class=\"homep\">\n        System health monitoring is a set of activities undertaken to maintain a\n        system in operable condition and may be limited to an observation of current system\n        states, with maintenance and repair being prompted by these observations. It is a\n        safeguard that not only protects your investment but also takes the guesswork out of\n        troubleshooting and diagnosing potential issues, lessening the burden on IT staff.\n        Think of it as the thread that weaves through your fabric and helps hold it together.\n        Without it, you’re leaving your technology and your business exposed to potential\n        issues that could easily have been avoided.\n    </p>\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-8\">CMDB</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/managents.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n        A configuration management database (CMDB) is a database that contains\nall relevant information about the hardware and software components used in an\n\nInternal\n    </p>\n    <p class=\"homep\">\norganization&#39;s IT services and the relationships between those components. A CMDB\nprovides an organized view of configuration data and a means of examining that data\nfrom any desired perspective.\n    </p>\n    <p class=\"homep\">\nAs IT infrastructure becomes more complex, the importance of tracking and\nunderstanding the information within the IT environment increases. The use of\nCMDBs is a best practice for IT leaders that need to identify and verify each\ncomponent of their infrastructure to better manage and improve it.\n    </p>\n    <p class=\"homep\">\nCMDBs provide a centralized view of IT data, which, in turn, offers IT-leaders,\nmore control over their infrastructure. A CMDB user can visualize each individual IT\ninfrastructure component -- for example, a storage device or an application running\non a server -- which reduces complexity, prevents administrative and management\nerrors and increases security.\n    </p>\n    \n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-9\">IT ASSET</p>\n\n<div class=\"row\">\n    <div class=\"col-md-6\">\n        <img src=\"assets/itassets.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n    </div>\n\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n        IT asset management (information technology asset management, or ITAM)\nis a set of business practices that combines financial, inventory and contractual\nfunctions to optimize spending and support lifecycle management and strategic\ndecision-making within the IT environment.\n    </p>\n    <p class=\"homep\">\n        ITAM is about more than creating an asset inventory. It&#39;s about continually\n        using the captured asset data to maximize returns, minimize risk and drive increased\n        business value. By avoiding unnecessary asset purchases and making the best use\n        of current resources, IT asset managers can cut software licensing and support\n        costs, eliminate waste and improve efficiency.\n    </p>\n    <p class=\"homep\">\n        ITAM also helps increase the companywide understanding of IT&#39;s business\n        value, improves communications and understanding between IT and other\n        departments, enforces compliance with cybersecurity policies and regulatory\n        requirements, improves productivity through technical support, and limits overhead\n        costs of managing the IT environment.\n\n    </p>\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-10\">SERVICE LEVEL MANAGEMENT</p>\n\n<div class=\"row\">\n    <div class=\"col-md-6\">\n        <img src=\"assets/sla.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n    </div>\n\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n        SLM is a vital process for every IT service provider organization in that it is\nresponsible for agreeing and documenting service level targets and responsibilities\nwithin SLAs and service level requirements (SLRs) for every service and related\nactivity within IT.\n</p>\n    <p class=\"homep\">\n        If these targets are appropriate and accurately reflect the requirements of the\nbusiness, then the service delivered by the service providers will align with business\nrequirements and meet the expectations of the customers and users regarding\nservice quality.\n    </p>\n    <h5 class=\"homep\">\n        Service Level Management activities include:\n    </h5>\n    <ul class=\"self\">\n      <li>\n          Identifying business requirements by working with business units\n      </li>\n      <li>\n          Establishing the scope of services, timeliness, hours of operation, recovery aspects,\n          and service performance\n      </li>\n      <li>\n          Translating business requirements into IT requirements\n\n      </li>\n      <li>\n\n          Developing and maintaining a service catalog, including costs for different tiers of\n          service performance\n          \n         \n\n      </li>\n      <li>\n           Performing gap analysis between business requirements and available services.\n\n      </li>\n      <li>\n           Determining the costs related to services such that service goals satisfy business\n          needs at a price the business can afford\n      </li>\n      <li>\n           Drafting, negotiating and refining SLAs with the business units, ensuring business\n          requirements are met and agreement from all parties involved\n      </li>\n      <li>\n         Implementing SLAs\n\n      </li>\n      <li>\n          Measuring SLA performance, reporting results and adjusting as necessary\n\n      </li>\n    </ul>\n  </div>\n</div> -->");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itoperations/itoperations.component.html":
/*!*******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itoperations/itoperations.component.html ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <p class=\"title3 text-center\" id=\"section-26\">IT  OPERATIONS</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <img src=\"assets/application-performence-management.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      IT operations are the processes and services administered by an organization’s information technology (IT) department. As such, IT operations include administrative processes and support for hardware and software, for both internal and external clients. IT operations determine the way an organization manages software and hardware and includes other IT support, such as network administration, device management, mobile contracting and help desks of all kinds. IT operations management and IT operations analytics help an organization refine the way that IT approaches services, deployment and support and help to ensure consistency, reliability and quality of service.\n    </p>\n\n  </div>\n</div>\n\n\n<p class=\"title3 text-center\" id=\"section-13\">MANAGER OF MANAGERS</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/itoperations.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n        The role of a MOM has moved from basic event consolidation to correlating\n        data across IT elements to show the impact the IT organization has on business. For\n        example, very few businesses need a raw storage array service. However, they do\n        need a responsive and reliable data warehouse service that depends on servers,\n        databases, storage, network connectivity, event correlation and analysis, and\n        analytical and reporting tools. Monitoring alone includes massive amounts of event,\n        metric and logo data.\n        \n    </p>\n    <p class=\"homep\">\n        To manage end-to-end services effectively, you need to bring all your\n        monitoring data into one place. By using a manager of managers monitoring system,\n        MoM operations collect a comprehensive set of data – including events, logs, and\n        metrics – from all your point tools. With modern systems, manager of managers\n        monitoring is no longer siloed – yes, the point tools still exist, but you now have all\n        the data in a single pane of glass.\n    </p>\n  </div>\n</div>\n\n\n<p class=\"title3 text-center\" id=\"section-14\">SERVICE MODELING</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/keyboard-vulnerability.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n        Service modeling typically strives to create models that provide a\ncomprehensive view of the analysis, design, and architecture of all &#39;Software Entities&#39;\nin an organization, which can be understood by individuals with diverse levels of\nbusiness and technical understanding. Service-oriented modeling typically\nencourages viewing software entities as &#39;assets&#39; (service-oriented assets) and refers\nto these assets collectively as &#39;services.\n    </p>\n\n  </div>\n</div>\n\n\n\n\n\n<p class=\"title3 text-center\" id=\"section-15\">PROACTIVE PERFORMANCE MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/application-performence-management.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      The goal of proactive performance management is to ensure that SLAs are\n      being met and will continue to be met. To accomplish this goal, it is necessary to\n      identify current and potential bottlenecks, inefficient or poorly performing\n      components, and potential failures. Proactive performance management is the\n      gathering of statistical data for monitoring and correcting the operation and\n      measuring the overall effectiveness of the network as well as aiding in the network\n      planning and analysis process.\n    </p>\n    <p class=\"homep\">\n      Performance management involves establishing a set of performance\nobjectives for resources and addressing the following steps:\n    </p>\n\n  </div>\n</div>\n\n\n\n\n\n\n<p class=\"title3 text-center\" id=\"section-16\">SYSTEM MONITORING</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/it-assets.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      The goal of proactive performance management is to ensure that SLAs are\n      being met and will continue to be met. To accomplish this goal, it is necessary to\n      identify current and potential bottlenecks, inefficient or poorly performing\n      components, and potential failures. Proactive performance management is the\n      gathering of statistical data for monitoring and correcting the operation and\n      measuring the overall effectiveness of the network as well as aiding in the network\n      planning and analysis process.\n    </p>\n    <p class=\"homep\">\n      Performance management involves establishing a set of performance\nobjectives for resources and addressing the following steps:\n    </p>\n\n  </div>\n</div>\n\n<p class=\"title3 text-center\" id=\"section-17\">CAPACITY MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/application-performence-management.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      Capacity Management ensures proper utilization of available resources and\nmakes future capacity requirements available in a cost-effective and timely manner.\nThe main purpose of capacity management is to make sure that the capacity of the\nIT services and infrastructure can meet the agreed-upon requirements of capacity\nand performance in a manner that is both timely and cost-effective. It also ensures\nthat IT is sized in an optimum and cost-effective manner by producing and regularly\nupgrading capacity plan.\n    </p>\n    <p class=\"homep\">\n      The capacity management process should cover the operational and\ndevelopment environment which includes the hardware, networking equipment,\nperipherals, software, and human resources. Capacity management makes sure that\nthe IT resources and planned and scheduled to deliver a level of service which is\nconsistent and matched to the present and future needs of the business.\n    </p>\n\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-18\">APPLICATION PERFORMANCE MANAGEMENT</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/ito.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      Application performance management (APM) is a practice within systems\nmanagement that targets managing and tracking the availability and efficiency of\nsoftware applications. APM involves translating IT metrics into business meaning.\n    </p>\n    <p class=\"homep\">\n      It examines the workflow and the associated IT tools that are deployed to\nanalyze, identify and report application performance concerns to make sure the\nexpectations of businesses and end-users are met. Application performance signifies\nhow quickly transactions are accomplished or details are sent to end-users using an\napplication.\n    </p>\n\n  </div>\n</div>\n\n\n\n\n -->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itoptimization/itoptimization.component.html":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itoptimization/itoptimization.component.html ***!
  \***********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"scroll-x\" id=\"section-27\">\n  <!-- <p class=\"title4 text-center\">IT OPTIMISATION</p>\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <img src=\"assets/cy1.jpg\" class=\"img-fluid\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n        IT process optimization is a practice that goes well beyond programming techniques, software domains, and\n        hardware knowledge. It’s a strategic element for modern organizations, increasingly dependent on the use of\n        information technology in their operations, in search of results. In this context, the goal of IT process\n        optimization has a much more predictive character than just providing technical support and answering calls.\n        It’s critical that IT managers see the organization’s strategic objectives and how they add value to the\n        solutions the organization delivers to external and internal customers, so they’re always satisfied.\n      </p>\n      <h1 class=\"text-center color\">The professional approach to security!</h1>\n\n    </div>\n  </div> -->\n  <!-- <hr class=\"bdr\">\n  <br>\n  <p class=\"title3 text-center health-monatring\" id=\"section-1\">HEALTH MONITORING</p>\n\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/health-monitoring.jpg\"  width=\"100%\" height=\"300px\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          Technology is everywhere. It has enhanced the way we do business, the way\n          we communicate; it streamlines processes, tracks inventory, monitors systems,\n          behaviors. The applications are endless and when working properly, you can almost\n          forget it’s there. However, when it’s not working properly, the effects are felt\n          immediately and can ripple through your business with detrimental consequences.\n          When approaching technology, the focus is almost always on acquiring the hardware\n          and/or software itself. It’s tangible, it’s exciting, and it serves a clear, defined\n          purpose. You can look at it, evaluate it, and plan how you will use it to enhance your\n          business.\n      </p>\n      <p class=\"homep\">\n          System health monitoring is a set of activities undertaken to maintain a\n          system in operable condition and may be limited to an observation of current system\n          states, with maintenance and repair being prompted by these observations. It is a\n          safeguard that not only protects your investment but also takes the guesswork out of\n          troubleshooting and diagnosing potential issues, lessening the burden on IT staff.\n          Think of it as the thread that weaves through your fabric and helps hold it together.\n          Without it, you’re leaving your technology and your business exposed to potential\n          issues that could easily have been avoided.\n      </p>\n    </div>\n  </div> -->\n  <!-- <p class=\"title3 text-center health-monatring\" id=\"section-2\">SERVICE MODELING</p>\n\n  <div class=\" row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/service-level-modeling.jpg\" class=\"img-fluid imgmarsm\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          Service-oriented modeling is the discipline of modeling business and\n          software systems, for the purpose of designing and specifying service-oriented\n          business systems within a variety of architectural styles and paradigms, such as\n          application architecture, service-oriented architecture, microservices, and cloud\n          computing.\n      </p>\n      <p class=\"homep\">\n          Service-oriented modeling typically strives to create models that provide a\n          comprehensive view of the analysis, design, and architecture of all &#39;Software Entities&#39;\n          in an organization, which can be understood by individuals with diverse levels of\n          business and technical understanding. Service-oriented modeling typically\n          encourages viewing software entities as &#39;assets&#39; (service-oriented assets) and refers\n          to these assets collectively as &#39;services.\n      </p>\n    </div>\n  </div> -->\n  <!-- <p class=\"title3 text-center\" id=\"section-3\">CUSTOMER EXPERIENCE</p>\n\n  <div class=\"health-monatring row\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/customer-experience.jpg\" class=\"img-fluid\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          Customer experience is defined by interactions between a customer and an\n          organization throughout their business relationship. An interaction can include\n          \n          Internal\n          \n          awareness, discovery, cultivation, advocacy, purchases, and service. We will allow\n          your business to gain valuable insight into the user experience of your website or e-\n          commerce website – so you can proactively pinpoint and fix problems.\n      </p>\n    </div>\n  </div> -->\n  <!-- <p class=\"title3 text-center\">SOFTWARE LICENSE MANAGEMENT</p>\n\n  <div class=\"health-monatring row\" id=\"section-4\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/software-license.jpg\" class=\"img-fluid\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          Software license management refers to the software tools or processes used\nby an organization to control and document where and how the company&#39;s software\nproducts are able to run in order to enforce and ensure compliance with software\nlicenses (also known as an End-User License Agreement, or EULA). Software\nlicense management, or SLM, is part of overall software asset management (SAM)\ncapability and involves the process of reducing, documenting, and controlling total IT\ncosts. In short, SLM is a plan to help you monitor and maintain all your organization’s\nvarious software licenses. CySpace Global™ shall help you keep track, manage your\nlicenses wherever and whenever needed. It is imperative for all organizations to\ninvest in this to avoid long term losses.\n      </p>\n    </div>\n  </div>\n\n</div> -->\n\n<!-- <p class=\"title3 text-center\">SERVICE LEVEL ANALYTICS</p>\n\n  <div class=\"health-monatring row\" id=\"section-12\">\n    <div class=\"col-md-12\">\n        <img src=\"../../../../assets/cyspace-images/Business-service-management/it-optimisation/service-level-analytics.jpg\" class=\"img-fluid\" width=\"100%\">\n\n    </div>\n    <div class=\"col-md-12\">\n      <p class=\"homep\">\n          A service-level agreement (SLA) defines the level of service expected by a\ncustomer from a supplier, laying out the metrics by which that service is measured,\nand the remedies or penalties, if any, should the agreed-on service levels not be\nachieved. SLAs are an integral part of an IT vendor contract. An SLA pulls together\ninformation on all the contracted services and their agreed-upon expected reliability\ninto a single document. They clearly state metrics, responsibilities, and expectations\nso that, in the event of issues with the service, neither party can plead ignorance. It\nensures both sides have the same understanding of requirements.\n      </p>\n    </div>\n  </div> -->\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itprocess/itprocess.component.html":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itprocess/itprocess.component.html ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- <p class=\"title3 text-center\" id=\"section-28\">IT PROCESS AUTOMATION</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <img src=\"assets/ito.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\" height=\"216px\">\n\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      As IT environments increase in complexity and the amount of data, devices, systems and platforms expand to become beyond the management capabilities of IT Ops teams, putting in place automated operations across IT Ops processes becomes essential. IT process automation (ITPA), is the ability to orchestrate and integrate tools, people and processes through workflow.\n    </p>\n\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-20\">WORKLOAD JOB SCHEDULING</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/it-process.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      Workload automation software is used to streamline and automate IT\nprocesses related to job scheduling, batch processing or other repetitive tasks.\nThese tools centralize control over business processes across mainframe, cloud, and\ncloud computing systems.\n    </p>\n    <p class=\"homep\">\n      Companies use workload automation software to manage, schedule, and\noptimize workload processes. These tools can streamline business processes and, in\neffect, simplify planning, increase efficiency, and cut costs.\n    </p>\n\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-21\">CONFIGURATION AUTOMATION</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/BSM.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      Without automation, building and maintaining large-scale modern IT systems\ncan be a resource-intensive undertaking and can lead to increased risk due to\nmanual error. Configuration and resource management is an automated method for\nmaintaining computer systems and software in a known, consistent state.\n    </p>\n    <p class=\"homep\">\n      The primary benefit of configuration management is the consistency of\nsystems and software. With configuration management, you no longer guess or hope\nthat a configuration is current. It is correct because the configuration management\nsystem ensures that it is correct.\n    </p>\n    <p class=\"homep\">\n      When combined with automation, configuration management can improve\nefficiency because manual configuration processes are replaced with automated\nprocesses. This also makes it possible to manage more targets with the same or\neven fewer resources.\n    </p>\n\n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-22\">PROCESS ORCHESTRATION</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/BSM.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n  </div>\n  <div class=\"col-md-6\">\n    <p class=\"homep\">\n      Process Orchestration provides a tool infrastructure to model and design\n      business processes - from the overall process flow and the sequence of activities up\n      to the interfaces and data types that are needed to integrate SAP systems and\n      external systems. Process Orchestration is the means by which a process is\n      executed and monitored and managed throughout its lifecycle.\n    </p>\n    \n  </div>\n</div>\n<p class=\"title3 text-center\" id=\"section-23\">MANAGED FILE TRANSFER</p>\n\n<div class=\"row\">\n  <div class=\"col-md-6\">\n      <img src=\"assets/BSM.jpg\" class=\"img-fluid imgmar\" alt=\"Responsive image\">\n  </div>\n  <div class=\"col-md-6\">\n\n   <p class=\"homep\">\n      Managed file transfer (MFT) is a type of software used to provide secure\n      internal, external and ad-hoc data transfers through a network. MFT software and\n      products are designed to help organizations meet the increasing security, compliance\n      and operational demands of moving information.\n   </p>\n  </div>\n</div>\n -->\n");

/***/ }),

/***/ "./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.css ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".homep{\n    color:white;\n    text-align:justify;\n}\n.title3{\n    font-size: 3rem;\n   color: #308A9F;\n   margin-bottom: 1.8rem;\n   font-weight: 700;\n}\n.adv{\n    color:white;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnVzaW5lc3Mtc2VydmljZS1tYW5hZ2VtZW50L2J1c2luZXNzLWNoaWxkL2Fkdmlzb3J5c2VydmljZS9hZHZpc29yeXNlcnZpY2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGVBQWU7R0FDaEIsY0FBYztHQUNkLHFCQUFxQjtHQUNyQixnQkFBZ0I7QUFDbkI7QUFDQTtJQUNJLFdBQVc7QUFDZiIsImZpbGUiOiJzcmMvYXBwL2J1c2luZXNzLXNlcnZpY2UtbWFuYWdlbWVudC9idXNpbmVzcy1jaGlsZC9hZHZpc29yeXNlcnZpY2UvYWR2aXNvcnlzZXJ2aWNlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaG9tZXB7XG4gICAgY29sb3I6d2hpdGU7XG4gICAgdGV4dC1hbGlnbjpqdXN0aWZ5O1xufVxuLnRpdGxlM3tcbiAgICBmb250LXNpemU6IDNyZW07XG4gICBjb2xvcjogIzMwOEE5RjtcbiAgIG1hcmdpbi1ib3R0b206IDEuOHJlbTtcbiAgIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4uYWR2e1xuICAgIGNvbG9yOndoaXRlO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: AdvisoryserviceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdvisoryserviceComponent", function() { return AdvisoryserviceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AdvisoryserviceComponent = class AdvisoryserviceComponent {
    constructor() { }
    ngOnInit() {
    }
};
AdvisoryserviceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-advisoryservice',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./advisoryservice.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./advisoryservice.component.css */ "./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.css")).default]
    })
], AdvisoryserviceComponent);



/***/ }),

/***/ "./src/app/business-service-management/business-child/business-child-routing.module.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/business-child-routing.module.ts ***!
  \*********************************************************************************************/
/*! exports provided: BusinessChildRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessChildRoutingModule", function() { return BusinessChildRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _business_business_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./business/business.component */ "./src/app/business-service-management/business-child/business/business.component.ts");
/* harmony import */ var _itoptimization_itoptimization_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./itoptimization/itoptimization.component */ "./src/app/business-service-management/business-child/itoptimization/itoptimization.component.ts");
/* harmony import */ var _itmanagement_itmanagement_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./itmanagement/itmanagement.component */ "./src/app/business-service-management/business-child/itmanagement/itmanagement.component.ts");
/* harmony import */ var _itoperations_itoperations_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./itoperations/itoperations.component */ "./src/app/business-service-management/business-child/itoperations/itoperations.component.ts");
/* harmony import */ var _itprocess_itprocess_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./itprocess/itprocess.component */ "./src/app/business-service-management/business-child/itprocess/itprocess.component.ts");
/* harmony import */ var _advisoryservice_advisoryservice_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./advisoryservice/advisoryservice.component */ "./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.ts");









const routes = [
    {
        path: '',
        component: _business_business_component__WEBPACK_IMPORTED_MODULE_3__["BusinessComponent"]
    },
    {
        path: 'it-optimization',
        component: _itoptimization_itoptimization_component__WEBPACK_IMPORTED_MODULE_4__["ItoptimizationComponent"]
    },
    {
        path: 'it-management',
        component: _itmanagement_itmanagement_component__WEBPACK_IMPORTED_MODULE_5__["ItmanagementComponent"]
    },
    {
        path: 'it-operations',
        component: _itoperations_itoperations_component__WEBPACK_IMPORTED_MODULE_6__["ItoperationsComponent"]
    },
    {
        path: 'it-process',
        component: _itprocess_itprocess_component__WEBPACK_IMPORTED_MODULE_7__["ItprocessComponent"]
    },
    {
        path: 'advisory',
        component: _advisoryservice_advisoryservice_component__WEBPACK_IMPORTED_MODULE_8__["AdvisoryserviceComponent"]
    }
];
let BusinessChildRoutingModule = class BusinessChildRoutingModule {
};
BusinessChildRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], BusinessChildRoutingModule);



/***/ }),

/***/ "./src/app/business-service-management/business-child/business-child.module.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/business-child.module.ts ***!
  \*************************************************************************************/
/*! exports provided: BusinessChildModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessChildModule", function() { return BusinessChildModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _itoptimization_itoptimization_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./itoptimization/itoptimization.component */ "./src/app/business-service-management/business-child/itoptimization/itoptimization.component.ts");
/* harmony import */ var _business_business_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./business/business.component */ "./src/app/business-service-management/business-child/business/business.component.ts");
/* harmony import */ var _business_child_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./business-child-routing.module */ "./src/app/business-service-management/business-child/business-child-routing.module.ts");
/* harmony import */ var _itmanagement_itmanagement_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./itmanagement/itmanagement.component */ "./src/app/business-service-management/business-child/itmanagement/itmanagement.component.ts");
/* harmony import */ var _itoperations_itoperations_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./itoperations/itoperations.component */ "./src/app/business-service-management/business-child/itoperations/itoperations.component.ts");
/* harmony import */ var _itprocess_itprocess_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./itprocess/itprocess.component */ "./src/app/business-service-management/business-child/itprocess/itprocess.component.ts");
/* harmony import */ var _advisoryservice_advisoryservice_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./advisoryservice/advisoryservice.component */ "./src/app/business-service-management/business-child/advisoryservice/advisoryservice.component.ts");









let BusinessChildModule = class BusinessChildModule {
};
BusinessChildModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_itoptimization_itoptimization_component__WEBPACK_IMPORTED_MODULE_2__["ItoptimizationComponent"], _business_business_component__WEBPACK_IMPORTED_MODULE_3__["BusinessComponent"], _itmanagement_itmanagement_component__WEBPACK_IMPORTED_MODULE_5__["ItmanagementComponent"], _itoperations_itoperations_component__WEBPACK_IMPORTED_MODULE_6__["ItoperationsComponent"], _itprocess_itprocess_component__WEBPACK_IMPORTED_MODULE_7__["ItprocessComponent"], _advisoryservice_advisoryservice_component__WEBPACK_IMPORTED_MODULE_8__["AdvisoryserviceComponent"]],
        imports: [_business_child_routing_module__WEBPACK_IMPORTED_MODULE_4__["BusinessChildRoutingModule"]]
    })
], BusinessChildModule);



/***/ }),

/***/ "./src/app/business-service-management/business-child/business/business.component.css":
/*!********************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/business/business.component.css ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".homep{\n    color:white;\n    text-align:justify;\n}\n.title3{\n    font-size: 3rem;\n   color: #308A9F;\n   margin-bottom: 1.8rem;\n   font-weight: 700;\n}\n.title4{\n    font-size: 3rem;\n   color: #308A9F;\n   margin-bottom: 0.8rem;\n   font-weight: 700;\n}\n.imgmar{\n    margin-top:200px;\n}\n.imgmarsm{\n    margin-top:30px;\n}\n.imgslm{\n    margin-top:40px;\n}\n.color{\n    /* color:#55C2B4; */\n    color:white;\n    font-size:3rem;\n}\n.bdr{\n    border: 0.4px solid grey;\n}\n.homep{\n    color:white;\n    text-align:justify;\n}\n.self{\n    color:white;\n        list-style-type: square;\n        list-style-position: outside;\n        list-style-image: none;\n}\n.adv{\n    color:white;\n}\n.text-center{\n    text-align: left !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnVzaW5lc3Mtc2VydmljZS1tYW5hZ2VtZW50L2J1c2luZXNzLWNoaWxkL2J1c2luZXNzL2J1c2luZXNzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxlQUFlO0dBQ2hCLGNBQWM7R0FDZCxxQkFBcUI7R0FDckIsZ0JBQWdCO0FBQ25CO0FBQ0E7SUFDSSxlQUFlO0dBQ2hCLGNBQWM7R0FDZCxxQkFBcUI7R0FDckIsZ0JBQWdCO0FBQ25CO0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLG1CQUFtQjtJQUNuQixXQUFXO0lBQ1gsY0FBYztBQUNsQjtBQUNBO0lBQ0ksd0JBQXdCO0FBQzVCO0FBS0E7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxXQUFXO1FBQ1AsdUJBQXVCO1FBQ3ZCLDRCQUE0QjtRQUM1QixzQkFBc0I7QUFDOUI7QUFDQTtJQUNJLFdBQVc7QUFDZjtBQUVBO0lBQ0ksMkJBQTJCO0FBQy9CIiwiZmlsZSI6InNyYy9hcHAvYnVzaW5lc3Mtc2VydmljZS1tYW5hZ2VtZW50L2J1c2luZXNzLWNoaWxkL2J1c2luZXNzL2J1c2luZXNzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaG9tZXB7XG4gICAgY29sb3I6d2hpdGU7XG4gICAgdGV4dC1hbGlnbjpqdXN0aWZ5O1xufVxuLnRpdGxlM3tcbiAgICBmb250LXNpemU6IDNyZW07XG4gICBjb2xvcjogIzMwOEE5RjtcbiAgIG1hcmdpbi1ib3R0b206IDEuOHJlbTtcbiAgIGZvbnQtd2VpZ2h0OiA3MDA7XG59XG4udGl0bGU0e1xuICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgIGNvbG9yOiAjMzA4QTlGO1xuICAgbWFyZ2luLWJvdHRvbTogMC44cmVtO1xuICAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmltZ21hcntcbiAgICBtYXJnaW4tdG9wOjIwMHB4O1xufVxuLmltZ21hcnNte1xuICAgIG1hcmdpbi10b3A6MzBweDtcbn1cbi5pbWdzbG17XG4gICAgbWFyZ2luLXRvcDo0MHB4O1xufVxuLmNvbG9ye1xuICAgIC8qIGNvbG9yOiM1NUMyQjQ7ICovXG4gICAgY29sb3I6d2hpdGU7XG4gICAgZm9udC1zaXplOjNyZW07XG59XG4uYmRye1xuICAgIGJvcmRlcjogMC40cHggc29saWQgZ3JleTtcbn1cblxuXG5cblxuLmhvbWVwe1xuICAgIGNvbG9yOndoaXRlO1xuICAgIHRleHQtYWxpZ246anVzdGlmeTtcbn1cbi5zZWxme1xuICAgIGNvbG9yOndoaXRlO1xuICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IHNxdWFyZTtcbiAgICAgICAgbGlzdC1zdHlsZS1wb3NpdGlvbjogb3V0c2lkZTtcbiAgICAgICAgbGlzdC1zdHlsZS1pbWFnZTogbm9uZTtcbn1cbi5hZHZ7XG4gICAgY29sb3I6d2hpdGU7XG59XG5cbi50ZXh0LWNlbnRlcntcbiAgICB0ZXh0LWFsaWduOiBsZWZ0ICFpbXBvcnRhbnQ7XG59Il19 */");

/***/ }),

/***/ "./src/app/business-service-management/business-child/business/business.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/business/business.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: BusinessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessComponent", function() { return BusinessComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let BusinessComponent = class BusinessComponent {
    constructor() { }
    ngOnInit() {
    }
};
BusinessComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-business',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./business.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/business/business.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./business.component.css */ "./src/app/business-service-management/business-child/business/business.component.css")).default]
    })
], BusinessComponent);



/***/ }),

/***/ "./src/app/business-service-management/business-child/itmanagement/itmanagement.component.css":
/*!****************************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/itmanagement/itmanagement.component.css ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/* .homep{\n    color:white;\n    text-align:justify;\n}\n.title3{\n    font-size: 3rem;\n   color: #308A9F;\n   margin-bottom: 1.8rem;\n   font-weight: 700;\n}\n.self{\n    color:white;\n} */\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnVzaW5lc3Mtc2VydmljZS1tYW5hZ2VtZW50L2J1c2luZXNzLWNoaWxkL2l0bWFuYWdlbWVudC9pdG1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0dBWUciLCJmaWxlIjoic3JjL2FwcC9idXNpbmVzcy1zZXJ2aWNlLW1hbmFnZW1lbnQvYnVzaW5lc3MtY2hpbGQvaXRtYW5hZ2VtZW50L2l0bWFuYWdlbWVudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLmhvbWVwe1xuICAgIGNvbG9yOndoaXRlO1xuICAgIHRleHQtYWxpZ246anVzdGlmeTtcbn1cbi50aXRsZTN7XG4gICAgZm9udC1zaXplOiAzcmVtO1xuICAgY29sb3I6ICMzMDhBOUY7XG4gICBtYXJnaW4tYm90dG9tOiAxLjhyZW07XG4gICBmb250LXdlaWdodDogNzAwO1xufVxuLnNlbGZ7XG4gICAgY29sb3I6d2hpdGU7XG59ICovIl19 */");

/***/ }),

/***/ "./src/app/business-service-management/business-child/itmanagement/itmanagement.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/itmanagement/itmanagement.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: ItmanagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItmanagementComponent", function() { return ItmanagementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ItmanagementComponent = class ItmanagementComponent {
    constructor() { }
    ngOnInit() {
    }
};
ItmanagementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-itmanagement',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./itmanagement.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itmanagement/itmanagement.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./itmanagement.component.css */ "./src/app/business-service-management/business-child/itmanagement/itmanagement.component.css")).default]
    })
], ItmanagementComponent);



/***/ }),

/***/ "./src/app/business-service-management/business-child/itoperations/itoperations.component.css":
/*!****************************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/itoperations/itoperations.component.css ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".homep{\n    color:white;\n    text-align:justify;\n}\n.title3{\n    font-size: 3rem;\n   color: #308A9F;\n   margin-bottom: 1.8rem;\n   font-weight: 700;\n}\n\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnVzaW5lc3Mtc2VydmljZS1tYW5hZ2VtZW50L2J1c2luZXNzLWNoaWxkL2l0b3BlcmF0aW9ucy9pdG9wZXJhdGlvbnMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGVBQWU7R0FDaEIsY0FBYztHQUNkLHFCQUFxQjtHQUNyQixnQkFBZ0I7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9idXNpbmVzcy1zZXJ2aWNlLW1hbmFnZW1lbnQvYnVzaW5lc3MtY2hpbGQvaXRvcGVyYXRpb25zL2l0b3BlcmF0aW9ucy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhvbWVwe1xuICAgIGNvbG9yOndoaXRlO1xuICAgIHRleHQtYWxpZ246anVzdGlmeTtcbn1cbi50aXRsZTN7XG4gICAgZm9udC1zaXplOiAzcmVtO1xuICAgY29sb3I6ICMzMDhBOUY7XG4gICBtYXJnaW4tYm90dG9tOiAxLjhyZW07XG4gICBmb250LXdlaWdodDogNzAwO1xufVxuXG4iXX0= */");

/***/ }),

/***/ "./src/app/business-service-management/business-child/itoperations/itoperations.component.ts":
/*!***************************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/itoperations/itoperations.component.ts ***!
  \***************************************************************************************************/
/*! exports provided: ItoperationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItoperationsComponent", function() { return ItoperationsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_common_events_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/common-events.service */ "./src/app/common-events.service.ts");




let ItoperationsComponent = class ItoperationsComponent {
    constructor(router, activeRouter, commonService) {
        this.router = router;
        this.activeRouter = activeRouter;
        this.commonService = commonService;
    }
    ngOnInit() {
        // this.commonService.scrollElement.on('HEALTH_MONITORING', responce => {
        //   this.scroll('HEALTH_MONITORING');
        // });
        // this.commonService.scrollElement.on('SERVICE_MODELING', responce => {
        //   this.scroll();
        // });
        // this.commonService.scrollElement.on('CUSTOMER_EXPERIENCE', responce => {
        //   this.scroll();
        // });
        // this.commonService.scrollElement.on('SOFTWARE_LICENSE_MANAGEMENT', responce => {
        //   this.scroll();
        // });
    }
    scroll(el) {
        el.scrollIntoView();
    }
};
ItoperationsComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: src_app_common_events_service__WEBPACK_IMPORTED_MODULE_3__["CommonEventsService"] }
];
ItoperationsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-itoperations',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./itoperations.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itoperations/itoperations.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./itoperations.component.css */ "./src/app/business-service-management/business-child/itoperations/itoperations.component.css")).default]
    })
], ItoperationsComponent);



/***/ }),

/***/ "./src/app/business-service-management/business-child/itoptimization/itoptimization.component.css":
/*!********************************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/itoptimization/itoptimization.component.css ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".homep{\n    color:white;\n    text-align:justify;\n}\n.title3{\n    font-size: 3rem;\n   color: #308A9F;\n   margin-bottom: 1.8rem;\n   font-weight: 700;\n}\n.title4{\n    font-size: 3rem;\n   color: #308A9F;\n   margin-bottom: 0.8rem;\n   font-weight: 700;\n}\n/* .scroll-x {\n    height: 60%;\n    overflow-y: scroll;\n} */\n.imgmar{\n    margin-top:200px;\n}\n.imgmarsm{\n    margin-top:30px;\n}\n.imgslm{\n    margin-top:40px;\n}\n.color{\n    color:#55C2B4;\n    font-size:3rem;\n}\n.bdr{\n    border: 0.1px solid grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnVzaW5lc3Mtc2VydmljZS1tYW5hZ2VtZW50L2J1c2luZXNzLWNoaWxkL2l0b3B0aW1pemF0aW9uL2l0b3B0aW1pemF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0FBQ3RCO0FBQ0E7SUFDSSxlQUFlO0dBQ2hCLGNBQWM7R0FDZCxxQkFBcUI7R0FDckIsZ0JBQWdCO0FBQ25CO0FBQ0E7SUFDSSxlQUFlO0dBQ2hCLGNBQWM7R0FDZCxxQkFBcUI7R0FDckIsZ0JBQWdCO0FBQ25CO0FBQ0E7OztHQUdHO0FBQ0g7SUFDSSxnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGFBQWE7SUFDYixjQUFjO0FBQ2xCO0FBQ0E7SUFDSSx3QkFBd0I7QUFDNUIiLCJmaWxlIjoic3JjL2FwcC9idXNpbmVzcy1zZXJ2aWNlLW1hbmFnZW1lbnQvYnVzaW5lc3MtY2hpbGQvaXRvcHRpbWl6YXRpb24vaXRvcHRpbWl6YXRpb24uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ob21lcHtcbiAgICBjb2xvcjp3aGl0ZTtcbiAgICB0ZXh0LWFsaWduOmp1c3RpZnk7XG59XG4udGl0bGUze1xuICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgIGNvbG9yOiAjMzA4QTlGO1xuICAgbWFyZ2luLWJvdHRvbTogMS44cmVtO1xuICAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cbi50aXRsZTR7XG4gICAgZm9udC1zaXplOiAzcmVtO1xuICAgY29sb3I6ICMzMDhBOUY7XG4gICBtYXJnaW4tYm90dG9tOiAwLjhyZW07XG4gICBmb250LXdlaWdodDogNzAwO1xufVxuLyogLnNjcm9sbC14IHtcbiAgICBoZWlnaHQ6IDYwJTtcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XG59ICovXG4uaW1nbWFye1xuICAgIG1hcmdpbi10b3A6MjAwcHg7XG59XG4uaW1nbWFyc217XG4gICAgbWFyZ2luLXRvcDozMHB4O1xufVxuLmltZ3NsbXtcbiAgICBtYXJnaW4tdG9wOjQwcHg7XG59XG4uY29sb3J7XG4gICAgY29sb3I6IzU1QzJCNDtcbiAgICBmb250LXNpemU6M3JlbTtcbn1cbi5iZHJ7XG4gICAgYm9yZGVyOiAwLjFweCBzb2xpZCBncmV5O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/business-service-management/business-child/itoptimization/itoptimization.component.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/itoptimization/itoptimization.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: ItoptimizationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItoptimizationComponent", function() { return ItoptimizationComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ItoptimizationComponent = class ItoptimizationComponent {
    constructor() { }
    ngOnInit() {
    }
};
ItoptimizationComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-itoptimization',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./itoptimization.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itoptimization/itoptimization.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./itoptimization.component.css */ "./src/app/business-service-management/business-child/itoptimization/itoptimization.component.css")).default]
    })
], ItoptimizationComponent);



/***/ }),

/***/ "./src/app/business-service-management/business-child/itprocess/itprocess.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/itprocess/itprocess.component.css ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".homep{\n    color:white;\n    text-align:justify;\n}\n.title3{\n    font-size: 3rem;\n   color: #308A9F;\n   margin-bottom: 1.8rem;\n   font-weight: 700;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYnVzaW5lc3Mtc2VydmljZS1tYW5hZ2VtZW50L2J1c2luZXNzLWNoaWxkL2l0cHJvY2Vzcy9pdHByb2Nlc3MuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFdBQVc7SUFDWCxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLGVBQWU7R0FDaEIsY0FBYztHQUNkLHFCQUFxQjtHQUNyQixnQkFBZ0I7QUFDbkIiLCJmaWxlIjoic3JjL2FwcC9idXNpbmVzcy1zZXJ2aWNlLW1hbmFnZW1lbnQvYnVzaW5lc3MtY2hpbGQvaXRwcm9jZXNzL2l0cHJvY2Vzcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhvbWVwe1xuICAgIGNvbG9yOndoaXRlO1xuICAgIHRleHQtYWxpZ246anVzdGlmeTtcbn1cbi50aXRsZTN7XG4gICAgZm9udC1zaXplOiAzcmVtO1xuICAgY29sb3I6ICMzMDhBOUY7XG4gICBtYXJnaW4tYm90dG9tOiAxLjhyZW07XG4gICBmb250LXdlaWdodDogNzAwO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/business-service-management/business-child/itprocess/itprocess.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/business-service-management/business-child/itprocess/itprocess.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ItprocessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItprocessComponent", function() { return ItprocessComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ItprocessComponent = class ItprocessComponent {
    constructor() { }
    ngOnInit() {
    }
};
ItprocessComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-itprocess',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./itprocess.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/business-service-management/business-child/itprocess/itprocess.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./itprocess.component.css */ "./src/app/business-service-management/business-child/itprocess/itprocess.component.css")).default]
    })
], ItprocessComponent);



/***/ }),

/***/ "./src/app/common-events.service.ts":
/*!******************************************!*\
  !*** ./src/app/common-events.service.ts ***!
  \******************************************/
/*! exports provided: CommonEventsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonEventsService", function() { return CommonEventsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_2__);



let CommonEventsService = class CommonEventsService {
    constructor() {
        this.scrollElement = new events__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
    }
    onScrollEvent(message) {
        this.scrollElement.emit(message);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], CommonEventsService.prototype, "scrollElement", void 0);
CommonEventsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CommonEventsService);



/***/ })

}]);
//# sourceMappingURL=business-child-business-child-module-es2015.js.map