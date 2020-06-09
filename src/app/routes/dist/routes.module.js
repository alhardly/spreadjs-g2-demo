"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.RoutesModule = void 0;
var core_1 = require("@angular/core");
var _shared_1 = require("@shared");
var routes_routing_module_1 = require("./routes-routing.module");
// dashboard pages
var dashboard_component_1 = require("./dashboard/dashboard.component");
// passport pages
var login_component_1 = require("./passport/login/login.component");
var register_component_1 = require("./passport/register/register.component");
var register_result_component_1 = require("./passport/register-result/register-result.component");
// single pages
var callback_component_1 = require("./callback/callback.component");
var lock_component_1 = require("./passport/lock/lock.component");
var chart_component_1 = require("./chart/chart.component");
var spreadjs_component_1 = require("./spreadjs/spreadjs.component");
// 动态组件指令
var dynamic_directive_1 = require("./dynamic.directive");
var COMPONENTS = [
    dashboard_component_1.DashboardComponent,
    // passport pages
    login_component_1.UserLoginComponent,
    register_component_1.UserRegisterComponent,
    register_result_component_1.UserRegisterResultComponent,
    // single pages
    callback_component_1.CallbackComponent,
    lock_component_1.UserLockComponent,
];
var COMPONENTS_NOROUNT = [];
var RoutesModule = /** @class */ (function () {
    function RoutesModule() {
    }
    RoutesModule = __decorate([
        core_1.NgModule({
            imports: [_shared_1.SharedModule, routes_routing_module_1.RouteRoutingModule],
            declarations: __spreadArrays(COMPONENTS, COMPONENTS_NOROUNT, [
                chart_component_1.ChartComponent,
                spreadjs_component_1.SpreadjsComponent,
                dynamic_directive_1.DynamicDirective
            ]),
            entryComponents: [
                chart_component_1.ChartComponent
            ]
        })
    ], RoutesModule);
    return RoutesModule;
}());
exports.RoutesModule = RoutesModule;
