"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.StartupService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var auth_1 = require("@delon/auth");
var style_icons_1 = require("../../../style-icons");
var style_icons_auto_1 = require("../../../style-icons-auto");
/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
var StartupService = /** @class */ (function () {
    function StartupService(iconSrv, menuService, settingService, aclService, titleService, tokenService, httpClient, injector) {
        this.menuService = menuService;
        this.settingService = settingService;
        this.aclService = aclService;
        this.titleService = titleService;
        this.tokenService = tokenService;
        this.httpClient = httpClient;
        this.injector = injector;
        iconSrv.addIcon.apply(iconSrv, __spreadArrays(style_icons_auto_1.ICONS_AUTO, style_icons_1.ICONS));
    }
    StartupService.prototype.viaHttp = function (resolve, reject) {
        var _this = this;
        rxjs_1.zip(this.httpClient.get('assets/tmp/app-data.json')).pipe(operators_1.catchError(function (res) {
            console.warn("StartupService.load: Network request failed", res);
            resolve(null);
            return [];
        })).subscribe(function (_a) {
            var appData = _a[0];
            // Application data
            var res = appData;
            // Application information: including site name, description, year
            _this.settingService.setApp(res.app);
            // User information: including name, avatar, email address
            _this.settingService.setUser(res.user);
            // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
            _this.aclService.setFull(true);
            // Menu data, https://ng-alain.com/theme/menu
            _this.menuService.add(res.menu);
            // Can be set page suffix title, https://ng-alain.com/theme/title
            _this.titleService.suffix = res.app.name;
        }, function () { }, function () {
            resolve(null);
        });
    };
    StartupService.prototype.viaMock = function (resolve, reject) {
        // const tokenData = this.tokenService.get();
        // if (!tokenData.token) {
        //   this.injector.get(Router).navigateByUrl('/passport/login');
        //   resolve({});
        //   return;
        // }
        // mock
        var app = {
            name: "ng-alain",
            description: "Ng-zorro admin panel front-end framework"
        };
        var user = {
            name: 'Admin',
            avatar: './assets/tmp/img/avatar.jpg',
            email: 'cipchk@qq.com',
            token: '123456789'
        };
        // Application information: including site name, description, year
        this.settingService.setApp(app);
        // User information: including name, avatar, email address
        this.settingService.setUser(user);
        // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
        this.aclService.setFull(true);
        // Menu data, https://ng-alain.com/theme/menu
        this.menuService.add([
            {
                text: 'Main',
                group: true,
                children: [
                    {
                        text: 'spreadjs和G2',
                        link: '/dashboard',
                        icon: { type: 'icon', value: 'appstore' }
                    },
                ]
            }
        ]);
        // Can be set page suffix title, https://ng-alain.com/theme/title
        this.titleService.suffix = app.name;
        resolve({});
    };
    StartupService.prototype.load = function () {
        var _this = this;
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise(function (resolve, reject) {
            // http
            // this.viaHttp(resolve, reject);
            // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
            _this.viaMock(resolve, reject);
        });
    };
    StartupService = __decorate([
        core_1.Injectable(),
        __param(5, core_1.Inject(auth_1.DA_SERVICE_TOKEN))
    ], StartupService);
    return StartupService;
}());
exports.StartupService = StartupService;
