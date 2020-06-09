import { Component, OnInit, ViewChildren, ViewChild, ViewContainerRef, QueryList, TemplateRef, ComponentFactoryResolver, AfterViewInit, ComponentFactory } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ChartComponent } from '../chart/chart.component';
import { DynamicDirective } from '../dynamic.directive';
import * as AntherDyDirective from '../dynamic.directive';
import * as GC from '@grapecity/spread-sheets';
import '@grapecity/spread-sheets-charts';
import { MiniChartCellType } from '../chart/miniChartCellType';

import { MiniChart, FloatChart } from '../MiniChart';


import { ActivatedRoute } from '@angular/router';
import { pxToNumber } from 'ng-zorro-antd/core/util/public-api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`
  :host {
    padding: 15px;
    display: block;
    background-color: white;
  }
 `]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChildren(DynamicDirective) public dynamicHostList;

  @ViewChild('floatChart', { static: true, read: ViewContainerRef }) floatChartTemplate: ViewContainerRef;

  // 迷你图的相关数据
  // public chartList = [];

  public insertRow = 4;
  public insertCol = 4;

  miniChartList: Array<MiniChart> = [];

  // 浮动图的相关数据
  startX = 20;
  startY = 20;
  fWidth = 300;
  fHeigth = 250;

  floatChartList: Array<FloatChart> = [];



  // spreadjs
  public spread;

  public activeSheet;

  public hostStyle = {
    height: '666px',
    width: '100%',
  };

  public jsonStr;

  // 是否是编辑模式
  isEdit;

  constructor(
    private http: _HttpClient,
    private resolver: ComponentFactoryResolver,
    private activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      queryParams => {

        if (queryParams.review) {
          const miniChartList = JSON.parse(localStorage.getItem('miniChartList'));
          const floatChartList = JSON.parse(localStorage.getItem('floatChartList'));

          this.goToRenderFloatChart(floatChartList);



          for (const miniChart of miniChartList) {
            this.renderMiniChart(miniChart.insertRow, miniChart.insertCol);
          }


        }
      });
  }

  // 因为renderFloatChart中有settimeout，有异步，所以这里需要等一个渲染完再渲染一个，或者 浮动元素的宿主也写成数组的形式，和mini图一样，可能需要另外写一个指令，因为都用dynamic-host的话，迷你图和浮动图的渲染会有点混乱
  async goToRenderFloatChart(floatChartList) {
    for (const floatChart of floatChartList) {
      await this.renderFloatChart(floatChart.x, floatChart.y, floatChart.width, floatChart.height);
    }
  }


  public workbookInit(args) {

    // 获取DOM用于initSpread方法中控制大小,G2也是从图形初始化函数中获得但和spreadJS获得的DOM不同
    this.spread = args.spread; // spread为真才给赋值确保spread赋值的时候为真

    this.activeSheet = args.spread.getActiveSheet(); // 获取 sheet

    this.activeSheet.defaults.rowHeight = 50; // 设置默认列宽

    this.activeSheet.defaults.colHeaderRowHeight = 50; // 设置默认列宽

    // this.initSpread();

    // 开启像素滚动
    // this.spread.options.scrollByPixel = true;
    console.log('表格options', this.spread.options.scrollByPixel);

    // 监听滚动事件
    this.activeSheet.bind(GC.Spread.Sheets.Events.TopRowChanged, (sender, scrollargs) => {
      // 等变化完再执行
      setTimeout(() => {
        this.changeMiniChartPosition(sender, scrollargs, 'top');
      }, 0);

    });
    // 监听滚动事件
    this.activeSheet.bind(GC.Spread.Sheets.Events.LeftColumnChanged, (sender, scrollargs) => {
      // 等变化完再执行
      setTimeout(() => {
        this.changeMiniChartPosition(sender, scrollargs, 'left');
      }, 0);

    });

    // 监听浮动元素的拖拽事件
    this.activeSheet.bind(GC.Spread.Sheets.Events.FloatingObjectChanged, (e, args) => {

      this.changeFloatChartSize(args);
    });

  }


  public ngAfterViewInit(): void {


  }



  // 根据类型不同动态添加不同的图片
  public addChart(flag: number) {

    // 迷你图
    // TODO: 如果是插入但分组行中，但分组收起时，图表也要隐藏，这个还需要接口
    if (flag === 0) {

      this.renderMiniChart(this.insertRow, this.insertCol);

      this.insertCol++;
      this.insertRow++;


    } else if (flag === 1) {
      this.renderFloatChart(this.startX, this.startY, this.fWidth, this.fHeigth);

      this.startX += 20;
      this.startY += 20;

    }
  }

  changeMiniChartPosition(sender, args, direction: string) {

    console.log(args);

    // 先判断是什么类型的滚动 
    // if (this.spread.options.scrollByPixel) { // 像素滚动

    //   // 计算滚动增量
    //   for (const miniChart of this.miniChartList) {
    //     this.activeSheet.getCell(miniChart.insertRow, miniChart.insertCol).cellType(new MiniChartCellType(miniChart.chartComponent));
    //   }

    // } else {


    for (const miniChart of this.miniChartList) {

      // 判断一页的表格行数是多少，然后再判断图表在不在这个区间内，好像不用，因为如果在滚动区间内，就自己会repaint？------并不会，自己写一个！
      // 果然如此，因为每滚动一下，canvas都需要重绘，就会重新调用paint方法，然后重新计算位置

      // 先把再前面的写出来试试看先 
      if (direction === 'top' && miniChart.insertRow < args.newTopRow) {
        miniChart.chartComponent.chartComHost.style.top = '-9999px';

      } else if (direction === 'left' && miniChart.insertCol < args.newLeftCol) {
        miniChart.chartComponent.chartComHost.style.left = '-9999px';

      } else {
        // 手动重绘
        this.activeSheet.getCell(miniChart.insertRow, miniChart.insertCol).cellType(new MiniChartCellType(miniChart.chartComponent));
      }


    }

    // }
  }

  // 浮动图表时，通过将app-chart append到 浮动元素中，这个时候需要修改chart组件中的html的元素指向
  updateChartComponent(chartComponent: ChartComponent, wrap: HTMLDivElement) {

    chartComponent.chartComHost = wrap.querySelector('app-chart');
    chartComponent.chartHost = chartComponent.chartComHost.querySelector('.chart-host');

    // 之所以要删除，是以为，元素append到浮动元素之后，再renderChart的话，在g2-custom中会生成两个canvas，因为这个指向也变了，暂时找不到是在哪里复制的canvas的指向，然后就直接删除了，再重绘了
    const div = chartComponent.chartComHost.querySelector('.chart-host >div');
    chartComponent.chartHost.removeChild(div);


    chartComponent.changeEl();

  }



  // 检查是否为null
  notNull(compareValue) {

    return compareValue != null;

  }


  // 检查之前是否插入过
  hasInserted(row: number, col: number) {
    return this.miniChartList.findIndex(
      item => {
        return item.insertRow === row && item.insertCol === col;
      }
    ) === -1 ? false : true;
  }

  // 清除已经添加的图表
  clearChart(flag: number) {
    if (flag === 0) {
      this.miniChartList.length = 0;
    } else if (flag === 1) {

      for (const floatChart of this.floatChartList) {
        this.activeSheet.floatingObjects.remove(floatChart.floatName);
      }

      this.floatChartList.length = 0;

    }
  }


  // 修改浮动元素的大小
  changeFloatChartSize(args) {

    if (args.propertyName === 'height' || args.propertyName === 'width') {
      const ps = args.floatingObject._ps;
      const floatChart = this.floatChartList.find(item => item.floatName === ps.name);

      if (floatChart) {
        floatChart.chartComponent.renderChart(undefined, undefined, ps.width - 20, ps.height - 20);
      }
    }

  }



  save() {
    const serializationOption = {
      ignoreStyle: true, // indicate to ignore the style when convert workbook to json, default value is false
      ignoreFormula: true, // indicate to ignore the formula when convert workbook to json, default value is false
      rowHeadersAsFrozenColumns: false, // indicate to treat the row headers as frozen columns when convert workbook to json, default value is false
      columnHeadersAsFrozenRows: false // indicate to treat the column headers as frozen rows when convert workbook to json, default value is false
    };
    this.jsonStr = JSON.stringify(this.activeSheet.toJSON(serializationOption));


    localStorage.setItem('json', this.jsonStr);

    const miniChartList = [];

    for (const miniChart of this.miniChartList) {

      const obj = {
        insertRow: miniChart.insertRow,
        insertCol: miniChart.insertCol,
      };
      miniChartList.push(obj);

    }
    localStorage.setItem('miniChartList', JSON.stringify(miniChartList));

    const floatChartList = [];

    for (const floatChart of this.floatChartList) {

      const ps = floatChart.floatingObject._ps;

      const obj = {
        x: ps.x,
        y: ps.y,
        width: ps.width,
        height: ps.height
      };
      floatChartList.push(obj);

    }

    localStorage.setItem('floatChartList', JSON.stringify(floatChartList));

    // 跳转 
    const skipUrl = `http://${window.location.host}/#/dashboard?review=true`;
    window.open(skipUrl, '_blank');

  }



  renderMiniChart(insertRow, insertCol) {

    if (this.notNull(insertCol) && this.notNull(insertRow) && !this.hasInserted(insertRow, insertCol)) {


      const chartFactory: ComponentFactory<ChartComponent> = this.resolver.resolveComponentFactory(ChartComponent);

      const miniChart = {
        chartComponent: null,
        insertRow,
        insertCol
      };
      this.miniChartList.push(miniChart);
      setTimeout(() => {
        const container = this.dynamicHostList._results[this.dynamicHostList._results.length - 1].viewContainerRef;
        const chartComponentRef = container.createComponent(chartFactory);
        chartComponentRef.instance.initFinish.subscribe(
          (initFinish) => {
            if (initFinish) {
              // 后面的传参可以优化，都可以放到ChartCompoent组件中
              const chartComponent: ChartComponent = chartComponentRef.instance;
              chartComponent.isMini = true;
              setTimeout(() => {

                this.activeSheet.getCell(insertRow, insertCol).cellType(new MiniChartCellType(chartComponent));
                miniChart.chartComponent = chartComponent;

              }, 0);

            }
          }
        );
      }, 10);


    } else {
      alert('该位置已有图表');
    }
  }


  renderFloatChart(x: number, y: number, w: number, h: number) {

    return new Promise(
      (resolve) => {
        if (this.notNull(x) && this.notNull(y) && this.notNull(w) && this.notNull(h)) {

          const index = this.floatChartList.length;
          const floatName = 'f' + index;

          const floatChart: FloatChart = {
            chartComponent: null,
            startX: x,
            startY: y,
            fWidth: w,
            fHeigth: h,
            floatName,
            floatingObject: null
          };

          this.floatChartList.push(floatChart);
          // setTimeout(() => {
          const chartFactory: ComponentFactory<ChartComponent> = this.resolver.resolveComponentFactory(ChartComponent);
          const chartComponentRef = this.floatChartTemplate.createComponent(chartFactory);
          chartComponentRef.instance.initFinish.subscribe(
            (initFinish) => {
              if (initFinish) {
                // 后面的传参可以优化，都可以放到ChartCompoent组件中
                const chartComponent: ChartComponent = chartComponentRef.instance;
                chartComponent.isFloat = true;
                setTimeout(() => {

                  const customFloatingObject = new GC.Spread.Sheets.FloatingObjects.FloatingObject(floatName, x, y, w, h);

                  const div: HTMLDivElement = document.createElement('div');

                  div.setAttribute('style', 'width: 100%;height:100%;background: #FFFFFF;border: 1px solid #ccc;overflow: hidden;');

                  div.appendChild(chartComponent.chartComHost);

                  customFloatingObject.content(div);

                  this.activeSheet.floatingObjects.add(customFloatingObject);

                  const wrap: any = document.querySelectorAll('.gc-floatingobject-container')[this.floatChartList.length - 1];


                  // 之所以要重新获取，是因为通过append方法，相当于删除之后重建，chartComponent.chartHost 保存的是删除前的路径，所以没用，所以在这个append之后应该要重新回去然后赋值
                  // 重绘的时候，没有用，也是因为 renderChart 中的container 的指向没有发生改变，所以需要重新修改 component中的指向！！！
                  this.updateChartComponent(chartComponent, wrap);

                  // 重新绘制图表
                  chartComponent.renderChart(undefined, undefined, w - 20, h - 20);
                  if (floatChart) {
                    floatChart.chartComponent = chartComponent;
                    floatChart.floatingObject = this.activeSheet.floatingObjects.get(floatName);
                  }

                  resolve();

                }, 0);

              }
            }
          );

          // }, 0);
        }
      }
    );


  }

}
