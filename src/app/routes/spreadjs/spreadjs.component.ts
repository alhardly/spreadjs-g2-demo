import { Component, OnInit } from '@angular/core';
import * as GC from '@grapecity/spread-sheets';

@Component({
  selector: 'app-spreadjs',
  templateUrl: './spreadjs.component.html',
  styles: [
  ]
})
export class SpreadjsComponent implements OnInit {

  public spread;

  public activeSheet;

  public hostStyle = {
    height: '666px',
    width: '100%',
  };

  constructor() { }

  public ngOnInit(): void {
  }

  public workbookInit(args) {

    // 获取DOM用于initSpread方法中控制大小,G2也是从图形初始化函数中获得但和spreadJS获得的DOM不同
    this.spread = args.spread; // spread为真才给赋值确保spread赋值的时候为真

    this.activeSheet = args.spread.getActiveSheet(); // 获取 sheet

  }

}
