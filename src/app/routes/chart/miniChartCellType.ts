// 迷你图的单元格类
import * as GC from '@grapecity/spread-sheets';
import { ChartComponent } from './chart.component';

const spreadNS = GC.Spread.Sheets;

export class MiniChartCellType extends spreadNS.CellTypes.Base {

    // chart组件实例
    chartComponent: ChartComponent;
    // g2
    chart;
    // g2-custon 标签
    chartHost;
    // chart组件选择器
    chartComHost;
    constructor(chartComponent: ChartComponent) {
        super();
        this.chartComponent = chartComponent;
        this.chart = chartComponent.chart;
        this.chartComHost = chartComponent.chartComHost;
        this.chartHost = chartComponent.chartHost;

    }

    paint(ctx, value, x, y, w, h, style, context): void {

        if (!ctx) {
            return;
        }

        super.paint.call(this, ctx, value, x, y, w, h, style, context);

        // 好了 是时候展示骗术了
        // 改变大小为当前单元格的大小
        // const chartCanvas: HTMLDivElement = document.querySelector('#mountNode');

        setTimeout(() => {

            // 上下左右留白5px;
            // const padding=5;
            this.chartHost.style.width = w - 10 + 'px';
            this.chartHost.style.height = h - 10 + 'px';

            // 重新绘制图表 
            // todo：如果 w和h没有改变的话，则不需要renderChart
            this.chartComponent.renderChart(undefined, undefined, w - 10, h - 10);

            // 下面的方法不可行
            // this.chart.changeSize(w - 10, h - 10);
            // this.chart.render(true);

            // 计算 表格相对于窗口的位置,现在是通过和 表格放在同一个级中，来定位的，后面如果不在同一级，则需要自己计算

            this.chartComHost.style.top = y + 5 + 'px';
            // console.log('重新定位');
            this.chartComHost.style.left = x + 5 + 'px';

        }, 10);


    }


}
