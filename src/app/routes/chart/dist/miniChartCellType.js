"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.MiniChartCellType = void 0;
// 迷你图的单元格类
var GC = require("@grapecity/spread-sheets");
var spreadNS = GC.Spread.Sheets;
var MiniChartCellType = /** @class */ (function (_super) {
    __extends(MiniChartCellType, _super);
    function MiniChartCellType(chartComponent) {
        var _this = _super.call(this) || this;
        _this.chartComponent = chartComponent;
        _this.chart = chartComponent.chart;
        _this.chartComHost = chartComponent.chartComHost;
        _this.chartHost = chartComponent.chartHost;
        return _this;
    }
    MiniChartCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
        if (!ctx) {
            return;
        }
        _super.prototype.paint.call(this, ctx, value, x, y, w, h, style, context);
        // 好了 是时候展示骗术了
        // 改变大小为当前单元格的大小
        // const chartCanvas: HTMLDivElement = document.querySelector('#mountNode');
        // setTimeout(() => {
        // 上下左右留白5px;
        // const padding=5;
        this.chartHost.style.width = w - 10 + 'px';
        this.chartHost.style.height = h - 10 + 'px';
        // 重新绘制图表
        this.chartComponent.renderChart(undefined, undefined, w - 10, h - 10);
        // 下面的方法不可行
        // this.chart.changeSize(w - 10, h - 10);
        // this.chart.render(true);
        // 计算 表格相对于窗口的位置,现在是通过和 表格放在同一个级中，来定位的，后面如果不在同一级，则需要自己计算
        this.chartComHost.style.top = y + 5 + 'px';
        // console.log('重新定位');
        this.chartComHost.style.left = x + 5 + 'px';
        // }, 10);
    };
    return MiniChartCellType;
}(spreadNS.CellTypes.Base));
exports.MiniChartCellType = MiniChartCellType;
