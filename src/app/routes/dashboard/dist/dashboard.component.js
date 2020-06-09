"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var chart_component_1 = require("../chart/chart.component");
var dynamic_directive_1 = require("../dynamic.directive");
var GC = require("@grapecity/spread-sheets");
var miniChartCellType_1 = require("../chart/miniChartCellType");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(http, resolver) {
        this.http = http;
        this.resolver = resolver;
        // 迷你图的相关数据
        // public chartList = [];
        this.insertRow = 4;
        this.insertCol = 4;
        this.miniChartList = [];
        // 浮动图的相关数据
        this.startX = 20;
        this.startY = 20;
        this.fWidth = 400;
        this.fHeigth = 300;
        this.floatChartList = [];
        this.hostStyle = {
            height: '666px',
            width: '100%'
        };
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.workbookInit = function (args) {
        var _this = this;
        // 获取DOM用于initSpread方法中控制大小,G2也是从图形初始化函数中获得但和spreadJS获得的DOM不同
        this.spread = args.spread; // spread为真才给赋值确保spread赋值的时候为真
        this.activeSheet = args.spread.getActiveSheet(); // 获取 sheet
        this.activeSheet.defaults.rowHeight = 50; // 设置默认列宽
        this.activeSheet.defaults.colHeaderRowHeight = 50; // 设置默认列宽
        console.log('表格options', this.spread.options.scrollByPixel);
        // 监听滚动事件
        this.activeSheet.bind(GC.Spread.Sheets.Events.TopRowChanged, function (sender, scrollargs) {
            _this.changeMiniChartPosition(sender, scrollargs, 'top');
        });
        // 监听滚动事件
        this.activeSheet.bind(GC.Spread.Sheets.Events.LeftColumnChanged, function (sender, scrollargs) {
            _this.changeMiniChartPosition(sender, scrollargs, 'left');
        });
        // this.activeSheet.bind(GC.Spread.Sheets.Events.RowChanged, (e, info) => {
        //   console.log('RowChanged', e, info);
        // });
    };
    DashboardComponent.prototype.ngAfterViewInit = function () {
    };
    // 根据类型不同动态添加不同的图片
    DashboardComponent.prototype.addChart = function (flag) {
        var _this = this;
        // 迷你图
        // TODO: 如果是插入但分组行中，但分组收起时，图表也要隐藏，这个还需要接口
        if (flag === 0) {
            if (this.notNull(this.insertCol) && this.notNull(this.insertRow) && !this.hasInserted(this.insertRow, this.insertCol)) {
                console.log('插入单元格位置', this.insertCol, this.insertRow);
                var chartFactory_1 = this.resolver.resolveComponentFactory(chart_component_1.ChartComponent);
                // this.chartList.push(1);
                var miniChart_1 = {
                    chartComponent: null,
                    insertRow: this.insertRow,
                    insertCol: this.insertCol
                };
                this.miniChartList.push(miniChart_1);
                setTimeout(function () {
                    var container = _this.dynamicHostList._results[_this.dynamicHostList._results.length - 1].viewContainerRef;
                    var chartComponentRef = container.createComponent(chartFactory_1);
                    chartComponentRef.instance.initFinish.subscribe(function (initFinish) {
                        if (initFinish) {
                            // 后面的传参可以优化，都可以放到ChartCompoent组件中
                            var chartComponent_1 = chartComponentRef.instance;
                            chartComponent_1.isMini = true;
                            setTimeout(function () {
                                console.log('我初始化');
                                _this.activeSheet.getCell(_this.insertRow, _this.insertCol).cellType(new miniChartCellType_1.MiniChartCellType(chartComponent_1));
                                miniChart_1.chartComponent = chartComponent_1;
                                _this.insertCol++;
                                _this.insertRow++;
                            }, 0);
                        }
                    });
                }, 10);
            }
        }
        else if (flag === 1) {
            if (this.notNull(this.startX) && this.notNull(this.startY) && this.notNull(this.fWidth) && this.notNull(this.fHeigth)) {
                var index = this.floatChartList.length;
                var floatName_1 = 'f' + index;
                var chartFactory_2 = this.resolver.resolveComponentFactory(chart_component_1.ChartComponent);
                var floatChart_1 = {
                    chartComponent: null,
                    startX: this.startX,
                    startY: this.startY,
                    fWidth: this.fWidth,
                    fHeigth: this.fHeigth
                };
                this.floatChartList.push(floatChart_1);
                setTimeout(function () {
                    var container = _this.dynamicHostList._results[_this.dynamicHostList._results.length - 1].viewContainerRef;
                    var chartComponentRef = container.createComponent(chartFactory_2);
                    chartComponentRef.instance.initFinish.subscribe(function (initFinish) {
                        if (initFinish) {
                            // 后面的传参可以优化，都可以放到ChartCompoent组件中
                            var chartComponent_2 = chartComponentRef.instance;
                            chartComponent_2.isFloat = true;
                            setTimeout(function () {
                                var customFloatingObject = new GC.Spread.Sheets.FloatingObjects.FloatingObject(floatName_1, _this.startX, _this.startY, _this.fWidth, _this.fHeigth);
                                var div = document.createElement('div');
                                div.classList.add('chartContainer');
                                div.setAttribute('style', 'width: 100%;height:100%;background: #FFFFFF;border: 1px solid #ccc;overflow: hidden;');
                                var divChart = document.createElement('div');
                                divChart.setAttribute('style', 'width: 100%;height:100%;');
                                // divChart.appendChild(chartComponent.chartComHost);
                                chartComponent_2.chartComHost.setAttribute('class', 'float');
                                div.appendChild(divChart);
                                customFloatingObject.content(div);
                                _this.activeSheet.floatingObjects.add(customFloatingObject);
                                var chartHost = chartComponent_2.chartComHost.querySelector('.chart-host');
                                // 之所以要重新获取，是因为通过append方法，相当于删除之后重建，chartComponent.chartHost 保存的是删除前的路径，所以没用，所以在这个append之后应该要重新回去然后赋值
                                // 重绘的时候，没有用，也是因为 renderChart 中的container 的指向没有发生改变，所以需要重新修改 component中的指向！！！
                                chartHost.style.width = _this.fWidth - 10 + 'px';
                                chartHost.style.height = _this.fWidth - 10 + 'px';
                                // 重新绘制图表
                                chartComponent_2.renderChart(undefined, undefined, _this.fWidth - 10, _this.fHeigth - 10);
                                floatChart_1.chartComponent = chartComponent_2;
                            }, 0);
                        }
                    });
                }, 0);
            }
        }
    };
    DashboardComponent.prototype.changeMiniChartPosition = function (sender, args, direction) {
        // 先判断是什么类型的滚动 
        if (this.spread.options.scrollByPixel) { // 像素滚动
        }
        else {
            console.log(args, this.miniChartList, this.activeSheet.getRowCount());
            // const newTopRow = args.newTopRow;
            // const oldTopRow = args.oldTopRow;
            console.log(this.miniChartList);
            for (var _i = 0, _a = this.miniChartList; _i < _a.length; _i++) {
                var miniChart = _a[_i];
                // 判断一页的表格行数是多少，然后再判断图表在不在这个区间内，好像不用，因为如果在滚动区间内，就自己会repaint？
                // 果然如此，因为每滚动一下，canvas都需要重绘，就会重新调用paint方法，然后重新计算位置
                // 先把再前面的写出来试试看先 
                if (direction === 'top' && miniChart.insertRow < args.newTopRow) {
                    miniChart.chartComponent.chartComHost.style.top = '-9999999px';
                }
                if (direction === 'left' && miniChart.insertCol < args.newLeftCol) {
                    miniChart.chartComponent.chartComHost.style.left = '-9999999px';
                }
            }
        }
    };
    // 检查是否为null
    DashboardComponent.prototype.notNull = function (compareValue) {
        return compareValue != null;
    };
    // 检查之前是否插入过
    DashboardComponent.prototype.hasInserted = function (row, col) {
        return this.miniChartList.findIndex(function (item) {
            return item.insertRow === row && item.insertCol === col;
        }) === -1 ? false : true;
    };
    // 清除已经添加的图表
    DashboardComponent.prototype.clearChart = function (flag) {
        if (flag === 0) {
            this.miniChartList.length = 0;
            // this.chartList.length = 0;
        }
    };
    __decorate([
        core_1.ViewChildren(dynamic_directive_1.DynamicDirective)
    ], DashboardComponent.prototype, "dynamicHostList");
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styles: ["\n  :host {\n    padding: 15px;\n    display: block;\n    background-color: white;\n  }\n "]
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
