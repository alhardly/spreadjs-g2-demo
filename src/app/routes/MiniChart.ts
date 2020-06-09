// 迷你chart的类型

import { ChartComponent } from './chart/chart.component';

export class MiniChart {

    chartComponent: ChartComponent;

    insertRow: number;

    insertCol: number;




}

export class FloatChart {

    chartComponent: ChartComponent;

    startX: number;

    startY: number;
    fWidth: number;
    fHeigth: number;
    floatName: string;

    // 浮动元素对象
    floatingObject;




}


