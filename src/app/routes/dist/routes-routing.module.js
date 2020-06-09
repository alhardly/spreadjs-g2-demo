"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RouteRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_1 = require("@delon/auth");
var environment_1 = require("@env/environment");
// layout
var default_component_1 = require("../layout/default/default.component");
var passport_component_1 = require("../layout/passport/passport.component");
// dashboard pages
var dashboard_component_1 = require("./dashboard/dashboard.component");
// passport pages
var login_component_1 = require("./passport/login/login.component");
var register_component_1 = require("./passport/register/register.component");
var register_result_component_1 = require("./passport/register-result/register-result.component");
// single pages
var callback_component_1 = require("./callback/callback.component");
var lock_component_1 = require("./passport/lock/lock.component");
var routes = [
    {
        path: '',
        component: default_component_1.LayoutDefaultComponent,
        canActivate: [auth_1.SimpleGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
            { path: 'exception', loadChildren: function () { return Promise.resolve().then(function () { return require('./exception/exception.module'); }).then(function (m) { return m.ExceptionModule; }); } },
        ]
    },
    // 全屏布局
    // {
    //     path: 'fullscreen',
    //     component: LayoutFullScreenComponent,
    //     children: [
    //     ]
    // },
    // passport
    {
        path: 'passport',
        component: passport_component_1.LayoutPassportComponent,
        children: [
            { path: 'login', component: login_component_1.UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
            { path: 'register', component: register_component_1.UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
            { path: 'register-result', component: register_result_component_1.UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } },
            { path: 'lock', component: lock_component_1.UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
        ]
    },
    // 单页不包裹Layout
    { path: 'callback/:type', component: callback_component_1.CallbackComponent },
    { path: 'aa/bb/view/dashboard', component: dashboard_component_1.DashboardComponent },
    { path: '**', redirectTo: 'exception/404' },
];
var RouteRoutingModule = /** @class */ (function () {
    function RouteRoutingModule() {
    }
    RouteRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, {
                    useHash: environment_1.environment.useHash,
                    // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
                    // Pls refer to https://ng-alain.com/components/reuse-tab
                    scrollPositionRestoration: 'top'
                })
            ],
            exports: [router_1.RouterModule]
        })
    ], RouteRoutingModule);
    return RouteRoutingModule;
}());
exports.RouteRoutingModule = RouteRoutingModule;
