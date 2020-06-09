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
exports.__esModule = true;
exports.LayoutDefaultComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var util_1 = require("@delon/util");
var environment_1 = require("@env/environment");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var setting_drawer_component_1 = require("./setting-drawer/setting-drawer.component");
var LayoutDefaultComponent = /** @class */ (function () {
    function LayoutDefaultComponent(router, msgSrv, resolver, settings, el, renderer, doc) {
        var _this = this;
        this.resolver = resolver;
        this.settings = settings;
        this.el = el;
        this.renderer = renderer;
        this.doc = doc;
        this.unsubscribe$ = new rxjs_1.Subject();
        this.isFetching = false;
        // scroll to top in change page
        router.events.pipe(operators_1.takeUntil(this.unsubscribe$)).subscribe(function (evt) {
            if (!_this.isFetching && evt instanceof router_1.RouteConfigLoadStart) {
                _this.isFetching = true;
            }
            if (evt instanceof router_1.NavigationError || evt instanceof router_1.NavigationCancel) {
                _this.isFetching = false;
                if (evt instanceof router_1.NavigationError) {
                    msgSrv.error("\u65E0\u6CD5\u52A0\u8F7D" + evt.url + "\u8DEF\u7531", { nzDuration: 1000 * 3 });
                }
                return;
            }
            if (!(evt instanceof router_1.NavigationEnd || evt instanceof router_1.RouteConfigLoadEnd)) {
                return;
            }
            if (_this.isFetching) {
                setTimeout(function () {
                    _this.isFetching = false;
                }, 100);
            }
        });
    }
    LayoutDefaultComponent.prototype.setClass = function () {
        var _a;
        var _b = this, el = _b.el, doc = _b.doc, renderer = _b.renderer, settings = _b.settings;
        var layout = settings.layout;
        util_1.updateHostClass(el.nativeElement, renderer, (_a = {},
            _a['alain-default'] = true,
            _a["alain-default__fixed"] = layout.fixed,
            _a["alain-default__collapsed"] = layout.collapsed,
            _a));
        doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
    };
    LayoutDefaultComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Setting componet for only developer
        if (!environment_1.environment.production) {
            setTimeout(function () {
                var settingFactory = _this.resolver.resolveComponentFactory(setting_drawer_component_1.SettingDrawerComponent);
                _this.settingHost.createComponent(settingFactory);
            }, 22);
        }
    };
    LayoutDefaultComponent.prototype.ngOnInit = function () {
        var _this = this;
        var _a = this, settings = _a.settings, unsubscribe$ = _a.unsubscribe$;
        settings.notify.pipe(operators_1.takeUntil(unsubscribe$)).subscribe(function () { return _this.setClass(); });
        this.setClass();
    };
    LayoutDefaultComponent.prototype.ngOnDestroy = function () {
        var unsubscribe$ = this.unsubscribe$;
        unsubscribe$.next();
        unsubscribe$.complete();
    };
    __decorate([
        core_1.ViewChild('settingHost', { read: core_1.ViewContainerRef, static: true })
    ], LayoutDefaultComponent.prototype, "settingHost");
    LayoutDefaultComponent = __decorate([
        core_1.Component({
            selector: 'layout-default',
            templateUrl: './default.component.html'
        }),
        __param(6, core_1.Inject(common_1.DOCUMENT))
    ], LayoutDefaultComponent);
    return LayoutDefaultComponent;
}());
exports.LayoutDefaultComponent = LayoutDefaultComponent;
