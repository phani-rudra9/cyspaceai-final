(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["data-data-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/data/data.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/data/data.component.html ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h2 class=\"hpage\">\n    DATA ANALYTICS\n </h2>\n <img src=\"assets/cyspace.jpg\" class=\"img-fluid\" alt=\"img-responsive\">\n\n<div class=\"bgcolor\">\n<div class=\"container-fluid\">\n  <div class=\"row cys3\">\n    <div class=\"col-md-3 cys2 \">\n      <div class=\"cys1 position-stick\">\n      <h5><a  [routerLink]=\"['data-science']\" fragment=\"section-1\" class=\"bsm\">DATA ANALYTICS</a></h5>\n      <h5>\n        </h5>\n          <div id=\"accordion\">\n              <div class=\"card\">\n                <div class=\"card-header\" id=\"headingOne\">\n                  <h5 class=\"mb-0\">\n                      <a [routerLink]=\"['data-science']\" fragment=\"section-1\">\n                    <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\n                        DATA ANALYTICS<i class=\"fa fa-chevron-circle-up\" aria-hidden=\"true\"></i>\n                    </button>\n                  </a>\n                  </h5>\n                </div>\n            \n                <div id=\"collapseOne\" class=\"collapse show\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\n                  <div class=\"card-body\">\n                      <ul class=\"list-group list-group-flush\">\n                          <li class=\"list-group-item\" ><a [routerLinkActive]=\"active\" [routerLink]=\"['data-science']\" fragment=\"section-1\">DATA SCIENCE</a></li>\n                          <li class=\"list-group-item\" ><a [routerLinkActive]=\"active\" [routerLink]=\"['data-science']\" fragment=\"section-2\">CYSPACE METHODOLOGIES</a></li>\n                          <li class=\"list-group-item\" ><a [routerLinkActive]=\"active\" [routerLink]=\"['data-science']\" fragment=\"section-3\"> DATA ANALYTICS STRATEGY</a></li>\n                          <li class=\"list-group-item\" ><a [routerLinkActive]=\"active\" [routerLink]=\"['data-science']\" fragment=\"section-4\"> DATA DISCOVERY AND AUGMENTATION</a></li>\n                          <li class=\"list-group-item\" ><a [routerLinkActive]=\"active\" [routerLink]=\"['data-science']\" fragment=\"section-5\"> DATA MANGEMENT</a></li>\n                          <li class=\"list-group-item\" ><a [routerLinkActive]=\"active\" [routerLink]=\"['data-science']\" fragment=\"section-6\"> INDUSTRIALIZED SOLUTIONS</a></li>\n                        </ul>\n                  </div>\n                </div>\n              </div>\n  </div>\n</div>\n</div>\n<div class=\"col-md-9\">\n    <router-outlet></router-outlet>\n  </div>\n</div>\n</div>\n</div>\n\n\n");

/***/ }),

/***/ "./src/app/data/data-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/data/data-routing.module.ts ***!
  \*********************************************/
/*! exports provided: DataRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataRoutingModule", function() { return DataRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.component */ "./src/app/data/data.component.ts");




const routes = [
    {
        path: '',
        component: _data_component__WEBPACK_IMPORTED_MODULE_3__["DataComponent"],
        children: [
            {
                path: '',
                loadChildren: './data-child/data-child.module#DataChildModule'
            }
        ]
    }
];
let DataRoutingModule = class DataRoutingModule {
};
DataRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], DataRoutingModule);



/***/ }),

/***/ "./src/app/data/data.component.css":
/*!*****************************************!*\
  !*** ./src/app/data/data.component.css ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/* .bgcolor{\r\n    background-color: black;\r\n}\r\n.homep{\r\n    margin-top: 0;\r\n   margin-bottom: 1rem;\r\n   color:white;\r\n   text-align:justify;\r\n   font-weight:300;\r\n}\r\n.hpage{\r\n    position: absolute;\r\n    top: 465px;\r\n   left: 335px;\r\n    font-size: 60px;\r\n   font-weight: 600;\r\n   color: #fff;\r\n}\r\n.mg-top{\r\n    margin-top: 30px;\r\n}\r\n@media(max-width:768px){\r\n    .hpage{\r\n         position: absolute;\r\n         top: 195px;\r\n         left: 136px;\r\n         font-size: 12px;\r\n        font-weight: 600;\r\n        color: #fff;\r\n    }\r\n}\r\n\r\n.title{\r\n   margin-bottom: 1.8rem;\r\n   margin-top: 1.8rem;\r\n}\r\n.title1{\r\n    margin-top:1rem;\r\n}\r\n.title3{\r\n    font-size: 3rem;\r\n   color: #308A9F;\r\n   margin-bottom: 1.8rem;\r\n   font-weight: 700;\r\n}\r\n.mb{\r\n    margin-bottom:1.8rem;\r\n}\r\n\r\n.cys1{\r\n    \r\n    margin-top:50px;\r\n}\r\n.cys2{\r\n    border-right: 2px solid grey;\r\n}\r\n.cys3{\r\npadding-top:25px;\r\npadding-bottom: 25px;\r\n}\r\n.h2{\r\n    color:#fff;\r\n    font-size:20px;\r\n    font-weight:700;\r\n}\r\n.bsm{\r\n    color:white;\r\n    text-decoration: none;\r\n}\r\n\r\n\r\n[data-toggle=\"collapse\"] .fa:before {   \r\n    content: \"\\f139\";\r\n    margin-left: 14rem;\r\n    position: relative;\r\n    bottom:23px;\r\n  }\r\n  \r\n  [data-toggle=\"collapse\"].collapsed .fa:before {\r\n    content: \"\\f13a\";\r\n  }\r\n  .container-fluid{\r\n    padding: 0 50px;\r\n}\r\n.card-header {\r\n    padding: 0.75rem 1.25rem;\r\n    margin-bottom: 0;\r\n    background-color: rgba(0, 0, 0, 0.03);\r\n    border-bottom: 4px solid black;\r\n}\r\n.btn-link {\r\n    font-weight: 700;\r\n    color: BLACK;\r\n    text-decoration: none;\r\n    text-decoration-line: none !important;\r\n    padding-left:0px;\r\n    font-size:13px;\r\n}\r\n.card-header:hover {\r\n    background-color:#308A9F;\r\n}\r\n\r\n.list-group-item {\r\n    position: relative;\r\n    display: block;\r\n    padding: 0.75rem 1.25rem;\r\n    margin-bottom: -1px;\r\n    color:black;\r\n    border: 1px solid white;\r\n}\r\n\r\n.card-body {\r\n    flex: 1 1 auto;\r\n    padding: 0.25rem;\r\n}\r\n\r\n.position-stick {\r\n    position: sticky;\r\n    top: 45px;\r\n}\r\n\r\na {\r\n    color: black;\r\n    text-decoration: none;\r\n    background-color: transparent;\r\n    text-decoration-line: none !important;\r\n}\r\na:hover{\r\n    color:#308A9F;\r\n} */\r\n.bgcolor{\r\n    background-color: black;\r\n}\r\n.homep{\r\n    margin-top: 0;\r\n   margin-bottom: 1rem;\r\n   color:white;\r\n   text-align:justify;\r\n   font-weight:300;\r\n}\r\n.hpage{\r\n    position: absolute;\r\n    top: 465px;\r\n   left: 335px;\r\n    font-size: 60px;\r\n   font-weight: 600;\r\n   color: #fff;\r\n}\r\n.mg-top{\r\n    margin-top: 30px;\r\n}\r\n@media(max-width:768px){\r\n    .hpage{\r\n         position: absolute;\r\n         top: 195px;\r\n         left: 136px;\r\n         font-size: 12px;\r\n        font-weight: 600;\r\n        color: #fff;\r\n    }\r\n}\r\n.title{\r\n   margin-bottom: 1.8rem;\r\n   margin-top: 1.8rem;\r\n}\r\n.title1{\r\n    margin-top:1rem;\r\n}\r\n.title3{\r\n    font-size: 3rem;\r\n   color: #308A9F;\r\n   margin-bottom: 1.8rem;\r\n   font-weight: 700;\r\n}\r\n.mb{\r\n    margin-bottom:1.8rem;\r\n}\r\n.cys1{\r\n    \r\n    margin-top:55px;\r\n}\r\n/* .cys2{\r\n    border-right: 2px solid grey;\r\n}\r\n.cys3{\r\npadding-top:25px;\r\npadding-bottom: 25px;\r\n} */\r\n.h2{\r\n    color:#fff;\r\n    font-size:20px;\r\n    font-weight:700;\r\n}\r\n.bsm{\r\n    color:#55C2B4;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    font-size: 17px;\r\n    font-weight: 700;\r\n}\r\n[data-toggle=\"collapse\"] .fa:before {   \r\n    content: \"\\f139\";\r\n    margin-left: 250px;\r\n    position: relative;\r\n    bottom:23px;\r\n  }\r\n[data-toggle=\"collapse\"].collapsed .fa:before {\r\n    content: \"\\f13a\";\r\n  }\r\n.container-fluid{\r\n    padding: 0 50px;\r\n}\r\n.card-header {\r\n    padding: 0.75rem 1.25rem;\r\n    margin-bottom: 0;\r\n    background-color: black;\r\n    border-bottom: 4px solid black;\r\n}\r\n.btn-link {\r\n    font-weight: 700;\r\n    color:#2B8A9F;\r\n    text-decoration: none;\r\n    -webkit-text-decoration-line: none !important;\r\n            text-decoration-line: none !important;\r\n    padding-left:0px;\r\n    font-size:15px;\r\n    position: relative;\r\n    right:81px;\r\n}\r\n.card-header:hover {\r\n    color:#308A9F;\r\n    font-weight:700;\r\n    font-size: 14px;\r\n}\r\n.list-group-item {\r\n    position: relative;\r\n    display: block;\r\n    padding: 0.75rem 0.25rem;\r\n    margin-bottom: -2px;\r\n    color: black;\r\n    background-color: black;\r\n    font-size: 13px;\r\n    margin-left:6px;\r\n}\r\n.card-body {\r\n    flex: 1 1 auto;\r\n    padding: 0.25rem;\r\n    background-color: black;\r\n    position: relative;\r\n    bottom:20px;\r\n}\r\n.position-stick {\r\n    position: -webkit-sticky;\r\n    position: sticky;\r\n    top: 45px;\r\n}\r\na {\r\n    color:white;\r\n    text-decoration: none;\r\n    background-color: transparent;\r\n    -webkit-text-decoration-line: none !important;\r\n            text-decoration-line: none !important;\r\n}\r\na:hover{\r\n    color:#308A9F;\r\n}\r\n.card{\r\n    background-color:black;\r\n}\r\n.list-group-item:hover {\r\n    position: relative;\r\n    display: block;\r\n    padding: 0.75rem 0.25rem;\r\n    margin-bottom: -2px;\r\n    color: black;\r\n    background-color: black;\r\n    font-size: 13px;\r\n    margin-left:35px;\r\n    /* transition-delay: 0.2s; */\r\n    transition-duration: 0.3s;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZGF0YS9kYXRhLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlJRztBQUNIO0lBQ0ksdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxhQUFhO0dBQ2QsbUJBQW1CO0dBQ25CLFdBQVc7R0FDWCxrQkFBa0I7R0FDbEIsZUFBZTtBQUNsQjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7R0FDWCxXQUFXO0lBQ1YsZUFBZTtHQUNoQixnQkFBZ0I7R0FDaEIsV0FBVztBQUNkO0FBQ0E7SUFDSSxnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJO1NBQ0ssa0JBQWtCO1NBQ2xCLFVBQVU7U0FDVixXQUFXO1NBQ1gsZUFBZTtRQUNoQixnQkFBZ0I7UUFDaEIsV0FBVztJQUNmO0FBQ0o7QUFFQTtHQUNHLHFCQUFxQjtHQUNyQixrQkFBa0I7QUFDckI7QUFDQTtJQUNJLGVBQWU7QUFDbkI7QUFDQTtJQUNJLGVBQWU7R0FDaEIsY0FBYztHQUNkLHFCQUFxQjtHQUNyQixnQkFBZ0I7QUFDbkI7QUFDQTtJQUNJLG9CQUFvQjtBQUN4QjtBQUVBOztJQUVJLGVBQWU7QUFDbkI7QUFDQTs7Ozs7O0dBTUc7QUFDSDtJQUNJLFVBQVU7SUFDVixjQUFjO0lBQ2QsZUFBZTtBQUNuQjtBQUNBO0lBQ0ksYUFBYTtJQUNiLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjtBQUdBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsV0FBVztFQUNiO0FBRUE7SUFDRSxnQkFBZ0I7RUFDbEI7QUFDQTtJQUNFLGVBQWU7QUFDbkI7QUFDQTtJQUNJLHdCQUF3QjtJQUN4QixnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLDhCQUE4QjtBQUNsQztBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixxQkFBcUI7SUFDckIsNkNBQXFDO1lBQXJDLHFDQUFxQztJQUNyQyxnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGtCQUFrQjtJQUNsQixVQUFVO0FBQ2Q7QUFDQTtJQUNJLGFBQWE7SUFDYixlQUFlO0lBQ2YsZUFBZTtBQUNuQjtBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZCx3QkFBd0I7SUFDeEIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGVBQWU7QUFDbkI7QUFFQTtJQUNJLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtJQUNsQixXQUFXO0FBQ2Y7QUFFQTtJQUNJLHdCQUFnQjtJQUFoQixnQkFBZ0I7SUFDaEIsU0FBUztBQUNiO0FBRUE7SUFDSSxXQUFXO0lBQ1gscUJBQXFCO0lBQ3JCLDZCQUE2QjtJQUM3Qiw2Q0FBcUM7WUFBckMscUNBQXFDO0FBQ3pDO0FBQ0E7SUFDSSxhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxzQkFBc0I7QUFDMUI7QUFJQTtJQUNJLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2Qsd0JBQXdCO0lBQ3hCLG1CQUFtQjtJQUNuQixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsNEJBQTRCO0lBQzVCLHlCQUF5QjtBQUM3QiIsImZpbGUiOiJzcmMvYXBwL2RhdGEvZGF0YS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLmJnY29sb3J7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG4uaG9tZXB7XHJcbiAgICBtYXJnaW4tdG9wOiAwO1xyXG4gICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICBjb2xvcjp3aGl0ZTtcclxuICAgdGV4dC1hbGlnbjpqdXN0aWZ5O1xyXG4gICBmb250LXdlaWdodDozMDA7XHJcbn1cclxuLmhwYWdle1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA0NjVweDtcclxuICAgbGVmdDogMzM1cHg7XHJcbiAgICBmb250LXNpemU6IDYwcHg7XHJcbiAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5tZy10b3B7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG59XHJcbkBtZWRpYShtYXgtd2lkdGg6NzY4cHgpe1xyXG4gICAgLmhwYWdle1xyXG4gICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgIHRvcDogMTk1cHg7XHJcbiAgICAgICAgIGxlZnQ6IDEzNnB4O1xyXG4gICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgIH1cclxufVxyXG5cclxuLnRpdGxle1xyXG4gICBtYXJnaW4tYm90dG9tOiAxLjhyZW07XHJcbiAgIG1hcmdpbi10b3A6IDEuOHJlbTtcclxufVxyXG4udGl0bGUxe1xyXG4gICAgbWFyZ2luLXRvcDoxcmVtO1xyXG59XHJcbi50aXRsZTN7XHJcbiAgICBmb250LXNpemU6IDNyZW07XHJcbiAgIGNvbG9yOiAjMzA4QTlGO1xyXG4gICBtYXJnaW4tYm90dG9tOiAxLjhyZW07XHJcbiAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuLm1ie1xyXG4gICAgbWFyZ2luLWJvdHRvbToxLjhyZW07XHJcbn1cclxuXHJcbi5jeXMxe1xyXG4gICAgXHJcbiAgICBtYXJnaW4tdG9wOjUwcHg7XHJcbn1cclxuLmN5czJ7XHJcbiAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCBncmV5O1xyXG59XHJcbi5jeXMze1xyXG5wYWRkaW5nLXRvcDoyNXB4O1xyXG5wYWRkaW5nLWJvdHRvbTogMjVweDtcclxufVxyXG4uaDJ7XHJcbiAgICBjb2xvcjojZmZmO1xyXG4gICAgZm9udC1zaXplOjIwcHg7XHJcbiAgICBmb250LXdlaWdodDo3MDA7XHJcbn1cclxuLmJzbXtcclxuICAgIGNvbG9yOndoaXRlO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG5cclxuW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl0gLmZhOmJlZm9yZSB7ICAgXHJcbiAgICBjb250ZW50OiBcIlxcZjEzOVwiO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE0cmVtO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm90dG9tOjIzcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFtkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdLmNvbGxhcHNlZCAuZmE6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6IFwiXFxmMTNhXCI7XHJcbiAgfVxyXG4gIC5jb250YWluZXItZmx1aWR7XHJcbiAgICBwYWRkaW5nOiAwIDUwcHg7XHJcbn1cclxuLmNhcmQtaGVhZGVyIHtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW0gMS4yNXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMDMpO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogNHB4IHNvbGlkIGJsYWNrO1xyXG59XHJcbi5idG4tbGluayB7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgY29sb3I6IEJMQUNLO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uLWxpbmU6IG5vbmUgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmctbGVmdDowcHg7XHJcbiAgICBmb250LXNpemU6MTNweDtcclxufVxyXG4uY2FyZC1oZWFkZXI6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjojMzA4QTlGO1xyXG59XHJcblxyXG4ubGlzdC1ncm91cC1pdGVtIHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcGFkZGluZzogMC43NXJlbSAxLjI1cmVtO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogLTFweDtcclxuICAgIGNvbG9yOmJsYWNrO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XHJcbn1cclxuXHJcbi5jYXJkLWJvZHkge1xyXG4gICAgZmxleDogMSAxIGF1dG87XHJcbiAgICBwYWRkaW5nOiAwLjI1cmVtO1xyXG59XHJcblxyXG4ucG9zaXRpb24tc3RpY2sge1xyXG4gICAgcG9zaXRpb246IHN0aWNreTtcclxuICAgIHRvcDogNDVweDtcclxufVxyXG5cclxuYSB7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIHRleHQtZGVjb3JhdGlvbi1saW5lOiBub25lICFpbXBvcnRhbnQ7XHJcbn1cclxuYTpob3ZlcntcclxuICAgIGNvbG9yOiMzMDhBOUY7XHJcbn0gKi9cclxuLmJnY29sb3J7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxufVxyXG4uaG9tZXB7XHJcbiAgICBtYXJnaW4tdG9wOiAwO1xyXG4gICBtYXJnaW4tYm90dG9tOiAxcmVtO1xyXG4gICBjb2xvcjp3aGl0ZTtcclxuICAgdGV4dC1hbGlnbjpqdXN0aWZ5O1xyXG4gICBmb250LXdlaWdodDozMDA7XHJcbn1cclxuLmhwYWdle1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA0NjVweDtcclxuICAgbGVmdDogMzM1cHg7XHJcbiAgICBmb250LXNpemU6IDYwcHg7XHJcbiAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgIGNvbG9yOiAjZmZmO1xyXG59XHJcbi5tZy10b3B7XHJcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xyXG59XHJcbkBtZWRpYShtYXgtd2lkdGg6NzY4cHgpe1xyXG4gICAgLmhwYWdle1xyXG4gICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgIHRvcDogMTk1cHg7XHJcbiAgICAgICAgIGxlZnQ6IDEzNnB4O1xyXG4gICAgICAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgIH1cclxufVxyXG5cclxuLnRpdGxle1xyXG4gICBtYXJnaW4tYm90dG9tOiAxLjhyZW07XHJcbiAgIG1hcmdpbi10b3A6IDEuOHJlbTtcclxufVxyXG4udGl0bGUxe1xyXG4gICAgbWFyZ2luLXRvcDoxcmVtO1xyXG59XHJcbi50aXRsZTN7XHJcbiAgICBmb250LXNpemU6IDNyZW07XHJcbiAgIGNvbG9yOiAjMzA4QTlGO1xyXG4gICBtYXJnaW4tYm90dG9tOiAxLjhyZW07XHJcbiAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuLm1ie1xyXG4gICAgbWFyZ2luLWJvdHRvbToxLjhyZW07XHJcbn1cclxuXHJcbi5jeXMxe1xyXG4gICAgXHJcbiAgICBtYXJnaW4tdG9wOjU1cHg7XHJcbn1cclxuLyogLmN5czJ7XHJcbiAgICBib3JkZXItcmlnaHQ6IDJweCBzb2xpZCBncmV5O1xyXG59XHJcbi5jeXMze1xyXG5wYWRkaW5nLXRvcDoyNXB4O1xyXG5wYWRkaW5nLWJvdHRvbTogMjVweDtcclxufSAqL1xyXG4uaDJ7XHJcbiAgICBjb2xvcjojZmZmO1xyXG4gICAgZm9udC1zaXplOjIwcHg7XHJcbiAgICBmb250LXdlaWdodDo3MDA7XHJcbn1cclxuLmJzbXtcclxuICAgIGNvbG9yOiM1NUMyQjQ7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG59XHJcblxyXG5cclxuW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl0gLmZhOmJlZm9yZSB7ICAgXHJcbiAgICBjb250ZW50OiBcIlxcZjEzOVwiO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDI1MHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm90dG9tOjIzcHg7XHJcbiAgfVxyXG4gIFxyXG4gIFtkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdLmNvbGxhcHNlZCAuZmE6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6IFwiXFxmMTNhXCI7XHJcbiAgfVxyXG4gIC5jb250YWluZXItZmx1aWR7XHJcbiAgICBwYWRkaW5nOiAwIDUwcHg7XHJcbn1cclxuLmNhcmQtaGVhZGVyIHtcclxuICAgIHBhZGRpbmc6IDAuNzVyZW0gMS4yNXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICAgIGJvcmRlci1ib3R0b206IDRweCBzb2xpZCBibGFjaztcclxufVxyXG4uYnRuLWxpbmsge1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgIGNvbG9yOiMyQjhBOUY7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB0ZXh0LWRlY29yYXRpb24tbGluZTogbm9uZSAhaW1wb3J0YW50O1xyXG4gICAgcGFkZGluZy1sZWZ0OjBweDtcclxuICAgIGZvbnQtc2l6ZToxNXB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcmlnaHQ6ODFweDtcclxufVxyXG4uY2FyZC1oZWFkZXI6aG92ZXIge1xyXG4gICAgY29sb3I6IzMwOEE5RjtcclxuICAgIGZvbnQtd2VpZ2h0OjcwMDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG5cclxuLmxpc3QtZ3JvdXAtaXRlbSB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBhZGRpbmc6IDAuNzVyZW0gMC4yNXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IC0ycHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbi1sZWZ0OjZweDtcclxufVxyXG5cclxuLmNhcmQtYm9keSB7XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxuICAgIHBhZGRpbmc6IDAuMjVyZW07XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGJvdHRvbToyMHB4O1xyXG59XHJcblxyXG4ucG9zaXRpb24tc3RpY2sge1xyXG4gICAgcG9zaXRpb246IHN0aWNreTtcclxuICAgIHRvcDogNDVweDtcclxufVxyXG5cclxuYSB7XHJcbiAgICBjb2xvcjp3aGl0ZTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uLWxpbmU6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG5hOmhvdmVye1xyXG4gICAgY29sb3I6IzMwOEE5RjtcclxufVxyXG4uY2FyZHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6YmxhY2s7XHJcbn1cclxuXHJcblxyXG5cclxuLmxpc3QtZ3JvdXAtaXRlbTpob3ZlciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBhZGRpbmc6IDAuNzVyZW0gMC4yNXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IC0ycHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbi1sZWZ0OjM1cHg7XHJcbiAgICAvKiB0cmFuc2l0aW9uLWRlbGF5OiAwLjJzOyAqL1xyXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4zcztcclxufSJdfQ== */");

/***/ }),

/***/ "./src/app/data/data.component.ts":
/*!****************************************!*\
  !*** ./src/app/data/data.component.ts ***!
  \****************************************/
/*! exports provided: DataComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataComponent", function() { return DataComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let DataComponent = class DataComponent {
    constructor() { }
    ngOnInit() {
    }
};
DataComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-data',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./data.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/data/data.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./data.component.css */ "./src/app/data/data.component.css")).default]
    })
], DataComponent);



/***/ }),

/***/ "./src/app/data/data.module.ts":
/*!*************************************!*\
  !*** ./src/app/data/data.module.ts ***!
  \*************************************/
/*! exports provided: DataModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataModule", function() { return DataModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _data_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-routing.module */ "./src/app/data/data-routing.module.ts");
/* harmony import */ var _data_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.component */ "./src/app/data/data.component.ts");




let DataModule = class DataModule {
};
DataModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _data_component__WEBPACK_IMPORTED_MODULE_3__["DataComponent"]
        ],
        imports: [
            _data_routing_module__WEBPACK_IMPORTED_MODULE_2__["DataRoutingModule"]
        ],
        providers: []
    })
], DataModule);



/***/ })

}]);
//# sourceMappingURL=data-data-module-es2015.js.map