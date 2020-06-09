"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SpreadjsComponent = void 0;
var core_1 = require("@angular/core");
var SpreadjsComponent = /** @class */ (function () {
    function SpreadjsComponent() {
        this.hostStyle = {
            height: '666px',
            width: '100%'
        };
    }
    SpreadjsComponent.prototype.ngOnInit = function () {
    };
    SpreadjsComponent.prototype.workbookInit = function (args) {
        // 获取DOM用于initSpread方法中控制大小,G2也是从图形初始化函数中获得但和spreadJS获得的DOM不同
        this.spread = args.spread; // spread为真才给赋值确保spread赋值的时候为真
        this.activeSheet = args.spread.getActiveSheet(); // 获取 sheet
    };
    SpreadjsComponent = __decorate([
        core_1.Component({
            selector: 'app-spreadjs',
            templateUrl: './spreadjs.component.html',
            styles: []
        })
    ], SpreadjsComponent);
    return SpreadjsComponent;
}());
exports.SpreadjsComponent = SpreadjsComponent;
