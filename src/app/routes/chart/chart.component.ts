import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';

import * as G2 from '@antv/g2';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  // host: {
  //   '[class.mini]': 'isMini',
  //   '[class.float]': 'isFloat',
  // },
  styles: [
    `
    :host.mini{
      position: absolute;
      top:-9999px;
    }
    :host.float{
      height:100%;
      width:100%;
      display:block;
      padding:10px;
      
    }
    :host.float .chart-host{
      height:100%;
      width:100%;
      display:block;
    }


    `
  ]
})
export class ChartComponent implements OnInit {

  // :host ::ng-deep div{
  //   height:100%;
  //   width:100%;
  //   display:block;
  // }
  // :host ::ng-deep canvas{
  //   height:100% !important;
  //   width:100% !important;
  //   display:block;
  // }
  @HostBinding('class.float') isFloat = false;
  @HostBinding('class.mini') isMini = false;

  chart; // chart实例
  chartHost; // chart 宿主----<g2-custom></g2-custom>
  chartComHost;  //  host


  // 插入类型，是迷你图还是浮动图
  // insertType;

  // isMini = false;
  // isFloat = false;
  // 监听是否完成初始化工作
  initFinish = new BehaviorSubject(false);

  constructor(private el: ElementRef) {

    this.chartComHost = this.el.nativeElement;
  }

  public ngOnInit(): void {
  }



  public renderChart(el?: ElementRef, fisrtTime?: boolean, width?: number, height?: number) {

    if (el) {
      this.chartHost = el.nativeElement;
    }

    const data = [{
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
      container: this.chartHost, // 指定图表容器 ID
      height: height ? height : 30, // 指定图表高度
      width: width ? width : 20, // 指定图表宽度
    });
    // Step 2: 载入数据源
    this.chart.data(data);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    this.chart
      .interval()
      .position('genre*sold')
      .color('genre');

    this.chart.animate(false);

    if (this.isMini) {
      this.chart.axis(false);
      this.chart.legend(false);
      this.chart.tooltip(false);
    }

    // Step 4: 渲染图表
    this.chart.render();

    if (fisrtTime) {
      this.initFinish.next(true);
    }

    // 添加点击事件，以触发联动跳转啥的，，，，，
    this.chart.on('click', ev => {
      console.log('联动，跳转', ev);
    });


  }

  // 修改this.el 的指向
  changeEl() {
    this.el.nativeElement = this.chartHost;
  }

}
