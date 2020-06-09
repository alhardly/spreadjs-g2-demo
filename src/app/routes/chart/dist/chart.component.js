"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChartComponent = void 0;
var core_1 = require("@angular/core");
var G2 = require("@antv/g2");
var rxjs_1 = require("rxjs");
var ChartComponent = /** @class */ (function () {
    function ChartComponent(el) {
        this.el = el;
        this.isFloat = false;
        this.isMini = false;
        // 插入类型，是迷你图还是浮动图
        // insertType;
        // isMini = false;
        // isFloat = false;
        // 监听是否完成初始化工作
        this.initFinish = new rxjs_1.BehaviorSubject(false);
        this.chartComHost = this.el.nativeElement;
    }
    ChartComponent.prototype.ngOnInit = function () {
    };
    ChartComponent.prototype.renderChart = function (el, fisrtTime, width, height) {
        if (el) {
            this.chartHost = el.nativeElement;
        }
        var data = [{
                genre: 'Sports',
                sold: 275
            }, {
                genre: 'Strategy',
                sold: 115
            }, {
                genre: 'Action',
                sold: 120
            }, {
                genre: 'Shooter',
                sold: 350
            }, {
                genre: 'Other',
                sold: 150
            }]; // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
        if (this.chart) {
            this.chart.destroy();
        }
        // Step 1: 创建 Chart 对象
        this.chart = new G2.Chart({
            container: this.chartHost,
            height: height ? height : 30,
            width: width ? width : 20
        });
        // Step 2: 载入数据源
        this.chart.data(data);
        // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
        this.chart
            .interval()
            .position('genre*sold')
            .color('genre');
        this.chart.axis(false);
        this.chart.legend(false);
        this.chart.animate(false);
        this.chart.tooltip(false);
        // Step 4: 渲染图表
        this.chart.render();
        if (fisrtTime) {
            this.initFinish.next(true);
        }
    };
    __decorate([
        core_1.HostBinding('class.float')
    ], ChartComponent.prototype, "isFloat");
    __decorate([
        core_1.HostBinding('class.mini')
    ], ChartComponent.prototype, "isMini");
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'app-chart',
            templateUrl: './chart.component.html',
            // host: {
            //   '[class.mini]': 'isMini',
            //   '[class.float]': 'isFloat',
            // },
            styles: [
                "\n    :host.mini{\n      position: absolute;\n      top:-9999px;\n    }\n    :host.float{\n      height:100%;\n      width:100%;\n      display:block;\n      \n    }\n    :host.float .chart-host{\n      height:100%;\n      width:100%;\n      display:block;\n    }\n\n    :host ::ng-deep div{\n      height:100%;\n      width:100%;\n      display:block;\n    }\n    :host ::ng-deep canvas{\n      height:100% !important;\n      width:100% !important;\n      display:block;\n    }\n\n    "
            ]
        })
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
