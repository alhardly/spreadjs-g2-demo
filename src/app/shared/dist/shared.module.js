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
exports.SharedModule = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var acl_1 = require("@delon/acl");
var chart_1 = require("@delon/chart");
var theme_1 = require("@delon/theme");
var shared_delon_module_1 = require("./shared-delon.module");
var shared_zorro_module_1 = require("./shared-zorro.module");
// spreadjs
// import { SpreadSheetsModule } from '@grapecity/spread-sheets-angular'; // 集成
var gc_spread_sheets_angular_1 = require("../../../lib/gc.spread.sheets.angular"); // 集成
// #region third libs
var THIRDMODULES = [
    gc_spread_sheets_angular_1.SpreadSheetsModule,
];
// #endregion
// #region your componets & directives
var COMPONENTS = [];
var DIRECTIVES = [];
// #endregion
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: __spreadArrays([
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule,
                forms_1.ReactiveFormsModule,
                theme_1.AlainThemeModule.forChild(),
                chart_1.DelonChartModule,
                acl_1.DelonACLModule
            ], shared_delon_module_1.SHARED_DELON_MODULES, shared_zorro_module_1.SHARED_ZORRO_MODULES, THIRDMODULES),
            declarations: __spreadArrays(COMPONENTS, DIRECTIVES),
            exports: __spreadArrays([
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule,
                theme_1.AlainThemeModule,
                chart_1.DelonChartModule,
                acl_1.DelonACLModule
            ], shared_delon_module_1.SHARED_DELON_MODULES, shared_zorro_module_1.SHARED_ZORRO_MODULES, THIRDMODULES, COMPONENTS, DIRECTIVES)
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
