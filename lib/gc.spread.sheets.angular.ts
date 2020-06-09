
/*!
 * 
 * SpreadJS Wrapper Components for Angular 0.0.0
 * 
 * Copyright(c) GrapeCity, Inc.  All rights reserved.
 * 
 * Licensed under the SpreadJS Commercial License.
 * us.sales@grapecity.com
 * http://www.grapecity.com/licensing/grapecity/
 * 
 */
import * as GC from '@grapecity/spread-sheets';
import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, QueryList, ContentChildren, OnDestroy, Output, EventEmitter, ElementRef, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'gc-column',
    template: `
        <ng-content></ng-content>
    `
})
export class ColumnComponent implements OnChanges {
    private changes: any = {};
    private sheet?: GC.Spread.Sheets.Worksheet;
    private index?: number;

    // indicate all inputs
    @Input() public width?: number;
    @Input() public dataField?: string;
    @Input() public headerText?: string;
    @Input() public visible?: boolean;
    @Input() public resizable?: boolean;
    @Input() public autoFit?: boolean;
    @Input() public style?: GC.Spread.Sheets.Style;
    @Input() public cellType?: GC.Spread.Sheets.CellTypes.Base;
    @Input() public headerStyle?: GC.Spread.Sheets.Style;
    @Input() public formatter: any;

    public onAttached(sheet: GC.Spread.Sheets.Worksheet, index: number): void {
        this.sheet = sheet;
        this.index = index;
        this.onColumnChanged();
    }

    private onColumnChanged() {
        if (this.sheet) {
            const sheet = this.sheet;
            sheet.suspendPaint();
            sheet.suspendEvent();
            const changes = this.changes;
            for (const changeName in changes) {
                let newValue = changes[changeName].currentValue;
                if (newValue === null || newValue === void 0) {
                    continue;
                }
                switch (changeName) {
                    case 'width':
                        newValue = parseInt(newValue, 10);
                        sheet.setColumnWidth(this.index as number, newValue);
                        break;
                    case 'visible':
                        sheet.setColumnVisible(this.index as number, newValue);
                        break;
                    case 'resizable':
                        sheet.setColumnResizable(this.index as number, newValue);
                        break;
                    case 'autoFit':
                        if (newValue) {
                            sheet.autoFitColumn(this.index as number);
                        }
                        break;
                    case 'style':
                        sheet.setStyle(-1, this.index as number, newValue);
                        break;
                    case 'headerStyle':
                        sheet.setStyle(-1, this.index as number, newValue, GC.Spread.Sheets.SheetArea.colHeader);
                        break;
                    case 'cellType':
                        sheet.setCellType(-1, this.index as number, newValue);
                        break;
                    case 'formatter':
                        sheet.setFormatter(-1, this.index as number, newValue, GC.Spread.Sheets.SheetArea.viewport);
                        break;
                }
            }
            sheet.resumeEvent();
            sheet.resumePaint();
        }
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.changes = {};
        const changesCache = this.changes;
        for (const changeName in changes) {
            changesCache[changeName] = changes[changeName];
        }
        this.onColumnChanged();
    }
}

@Component({
    selector: 'gc-worksheet',
    template: `
        <ng-content></ng-content>
    `
})
export class WorksheetComponent implements OnChanges, AfterViewInit {
    private sheet: GC.Spread.Sheets.Worksheet;
    @ContentChildren(ColumnComponent)
    public columns?: QueryList<ColumnComponent>;

    // indicate all inputs
    @Input() public rowCount?: number;
    @Input() public colCount?: number;
    @Input() public dataSource: any;
    @Input() public name?: string;
    @Input() public frozenColumnCount?: number;
    @Input() public frozenRowCount?: number;
    @Input() public frozenTrailingRowCount?: number;
    @Input() public frozenTrailingColumnCount?: number;
    @Input() public allowCellOverflow?: boolean;
    @Input() public frozenlineColor?: string;
    @Input() public sheetTabColor?: string;
    @Input() public selectionPolicy?: number;
    @Input() public selectionUnit?: number;
    @Input() public zoom?: number;
    @Input() public currentTheme?: string;
    @Input() public clipBoardOptions?: number;
    @Input() public rowHeaderVisible?: boolean;
    @Input() public colHeaderVisible?: boolean;
    @Input() public rowHeaderAutoText?: number;
    @Input() public colHeaderAutoText?: number;
    @Input() public rowHeaderAutoTextIndex?: number;
    @Input() public colHeaderAutoTextIndex?: number;
    @Input() public isProtected?: boolean;
    @Input() public showRowOutline?: boolean;
    @Input() public showColumnOutline?: boolean;
    @Input() public selectionBackColor?: string;
    @Input() public selectionBorderColor?: string;
    @Input() public defaultStyle?: GC.Spread.Sheets.Style;
    @Input() public rowOutlineInfo?: any[];
    @Input() public columnOutlineInfo?: any[];
    @Input() public autoGenerateColumns?: boolean;


    constructor() {
        this.sheet = new GC.Spread.Sheets.Worksheet('');
    }

    public onAttached(): void {
        const sheet = this.sheet;
        const columns = (this.columns as QueryList<ColumnComponent>);
        sheet.suspendPaint();
        sheet.suspendEvent();
        if (this.dataSource) {
            sheet.setDataSource(this.dataSource);
            columns.forEach((columnComponent: ColumnComponent, index: number) => {
                if (columnComponent.dataField) {
                    sheet.bindColumn(index, {
                        name: columnComponent.dataField,
                        displayName: columnComponent.headerText
                    });
                }
            });
        }
        if (columns.length > 0) {
            sheet.setColumnCount(columns.length);
            columns.forEach((columnComponent: ColumnComponent, index: number) => {
                columnComponent.onAttached(this.sheet, index);
            });
        }
        sheet.resumeEvent();
        sheet.resumePaint();
    }
    public getSheet() {
        return this.sheet;
    }

    public ngOnChanges(changes: SimpleChanges) {
        const sheet = this.sheet;
        sheet.suspendPaint();
        sheet.suspendEvent();
        for (const changeName in changes) {
            const newValue = changes[changeName].currentValue;
            if (newValue === null || newValue === void 0) {
                continue;
            }
            switch (changeName) {
                case 'rowCount':
                    sheet.setRowCount(newValue);
                    break;
                case 'colCount':
                    sheet.setColumnCount(newValue);
                    break;
                case 'name':
                    sheet.name(newValue);
                    break;
                case 'frozenColumnCount':
                    sheet.frozenColumnCount(newValue);
                    break;
                case 'frozenRowCount':
                    sheet.frozenRowCount(newValue);
                    break;
                case 'frozenTrailingRowCount':
                    sheet.frozenTrailingRowCount(newValue);
                    break;
                case 'frozenTrailingColumnCount':
                    sheet.frozenTrailingColumnCount(newValue);
                    break;
                case 'selectionPolicy':
                    sheet.selectionPolicy(newValue);
                    break;
                case 'selectionUnit':
                    sheet.selectionUnit(newValue);
                    break;
                case 'zoom':
                    sheet.zoom(newValue);
                    break;
                case 'currentTheme':
                    sheet.currentTheme(newValue);
                    break;
                case 'defaultStyle':
                    sheet.setDefaultStyle(newValue);
                    break;
                case 'rowOutlineInfo':
                    newValue.forEach((item: any) => {
                        sheet.rowOutlines.group(item.index, item.count);
                    });
                    sheet.repaint();
                    break;
                case 'columnOutlineInfo':
                    newValue.forEach((item: any) => {
                        sheet.columnOutlines.group(item.index, item.count);
                    });
                    sheet.repaint();
                    break;
                case 'showRowOutline':
                    sheet.showRowOutline(newValue);
                    break;
                case 'showColumnOutline':
                    sheet.showColumnOutline(newValue);
                    break;
                case 'dataSource':
                    sheet.setDataSource(newValue);
                    break;
                case 'autoGenerateColumns':
                    sheet[changeName] = newValue;
                default:
                    (sheet.options as any)[changeName] = newValue;
            }
        }
        sheet.resumeEvent();
        sheet.resumePaint();
    }

    public ngAfterViewInit() {
        (this.columns as QueryList<ColumnComponent>).changes.subscribe(() => { this.onAttached(); });
    }

    ngOnDestroy() {
        const sheet = this.sheet;
        const spread = sheet ? sheet.getParent() : null;
        if (spread) {
            const sheetIndex = spread.getSheetIndex(sheet.name());
            if (sheetIndex !== void 0) {
                spread.removeSheet(sheetIndex);
            }
        }
    }
}

@Component({
    selector: 'gc-spread-sheets',
    template: `
        <div [ngStyle]="style" [ngClass]="hostClass">
            <ng-content></ng-content>
        </div>
    `
})
export class SpreadSheetsComponent implements OnChanges, AfterViewInit, OnDestroy {
    private elRef: ElementRef;
    private spread?: GC.Spread.Sheets.Workbook;
    private spreadOptions?: any[];

    public style = {
        width: '800px',
        height: '600px'
    };

    // indicate all options
    @Input() public allowUserResize?: boolean;
    @Input() public allowUserZoom?: boolean;
    @Input() public allowUserEditFormula?: boolean;
    @Input() public allowUserDragFill?: boolean;
    @Input() public allowUserDragDrop?: boolean;
    @Input() public allowUserDragMerge?: boolean;
    @Input() public allowUndo?: boolean;
    @Input() public allowSheetReorder?: boolean;
    @Input() public allowContextMenu?: boolean;
    @Input() public allowUserDeselect?: boolean;
    @Input() public allowCopyPasteExcelStyle?: boolean;
    @Input() public allowExtendPasteRange?: boolean;
    @Input() public cutCopyIndicatorVisible?: boolean;
    @Input() public cutCopyIndicatorBorderColor?: string;
    @Input() public copyPasteHeaderOptions?: number;
    @Input() public defaultDragFillType?: number;
    @Input() public enableFormulaTextbox?: boolean;
    @Input() public highlightInvalidData?: boolean;
    @Input() public newTabVisible?: boolean;
    @Input() public tabStripVisible?: boolean;
    @Input() public tabEditable?: boolean;
    @Input() public tabStripRatio?: number;
    @Input() public tabNavigationVisible?: boolean;
    @Input() public autoFitType?: number;
    @Input() public referenceStyle?: number;
    @Input() public backColor?: string;
    @Input() public grayAreaBackColor?: string;
    @Input() public resizeZeroIndicator?: number;
    @Input() public showVerticalScrollbar?: boolean;
    @Input() public showHorizontalScrollbar?: boolean;
    @Input() public scrollbarMaxAlign?: boolean;
    @Input() public scrollIgnoreHidden?: boolean;
    @Input() public hostStyle?: any; // used for get styles form parent host DIV
    @Input() public hostClass?: string;
    @Input() public hideSelection?: boolean;
    @Input() public name?: string;
    @Input() public backgroundImage?: string;
    @Input() public backgroundImageLayout?: number;
    @Input() public showScrollTip?: number;
    @Input() public showResizeTip?: number;
    @Input() public showDragDropTip?: boolean;
    @Input() public showDragFillTip?: boolean;
    @Input() public showDragFillSmartTag?: boolean;
    @Input() public scrollbarShowMax?: boolean;
    @Input() public useTouchLayout?: boolean;


    // outputs events
    @Output() public workbookInitialized = new EventEmitter<any>();
    @Output() public validationError = new EventEmitter<any>();
    @Output() public cellClick = new EventEmitter<any>();
    @Output() public cellDoubleClick = new EventEmitter<any>();
    @Output() public enterCell = new EventEmitter<any>();
    @Output() public leaveCell = new EventEmitter<any>();
    @Output() public valueChanged = new EventEmitter<any>();
    @Output() public topRowChanged = new EventEmitter<any>();
    @Output() public leftColumnChanged = new EventEmitter<any>();
    @Output() public invalidOperation = new EventEmitter<any>();
    @Output() public rangeFiltering = new EventEmitter<any>();
    @Output() public rangeFiltered = new EventEmitter<any>();
    @Output() public tableFiltering = new EventEmitter<any>();
    @Output() public tableFiltered = new EventEmitter<any>();
    @Output() public rangeSorting = new EventEmitter<any>();
    @Output() public rangeSorted = new EventEmitter<any>();
    @Output() public clipboardChanging = new EventEmitter<any>();
    @Output() public clipboardChanged = new EventEmitter<any>();
    @Output() public clipboardPasting = new EventEmitter<any>();
    @Output() public clipboardPasted = new EventEmitter<any>();
    @Output() public columnWidthChanging = new EventEmitter<any>();
    @Output() public columnWidthChanged = new EventEmitter<any>();
    @Output() public rowHeightChanging = new EventEmitter<any>();
    @Output() public rowHeightChanged = new EventEmitter<any>();
    @Output() public dragDropBlock = new EventEmitter<any>();
    @Output() public dragDropBlockCompleted = new EventEmitter<any>();
    @Output() public dragFillBlock = new EventEmitter<any>();
    @Output() public dragFillBlockCompleted = new EventEmitter<any>();
    @Output() public editStarting = new EventEmitter<any>();
    @Output() public editChange = new EventEmitter<any>();
    @Output() public editEnding = new EventEmitter<any>();
    @Output() public editEnd = new EventEmitter<any>();
    @Output() public editEnded = new EventEmitter<any>();
    @Output() public rangeGroupStateChanging = new EventEmitter<any>();
    @Output() public rangeGroupStateChanged = new EventEmitter<any>();
    @Output() public selectionChanging = new EventEmitter<any>();
    @Output() public selectionChanged = new EventEmitter<any>();
    @Output() public sheetTabClick = new EventEmitter<any>();
    @Output() public sheetTabDoubleClick = new EventEmitter<any>();
    @Output() public sheetNameChanging = new EventEmitter<any>();
    @Output() public sheetNameChanged = new EventEmitter<any>();
    @Output() public userZooming = new EventEmitter<any>();
    @Output() public userFormulaEntered = new EventEmitter<any>();
    @Output() public cellChanged = new EventEmitter<any>();
    @Output() public columnChanged = new EventEmitter<any>();
    @Output() public rowChanged = new EventEmitter<any>();
    @Output() public activeSheetChanging = new EventEmitter<any>();
    @Output() public activeSheetChanged = new EventEmitter<any>();
    @Output() public sparklineChanged = new EventEmitter<any>();
    @Output() public rangeChanged = new EventEmitter<any>();
    @Output() public buttonClicked = new EventEmitter<any>();
    @Output() public editorStatusChanged = new EventEmitter<any>();
    @Output() public floatingObjectChanged = new EventEmitter<any>();
    @Output() public floatingObjectSelectionChanged = new EventEmitter<any>();
    @Output() public pictureChanged = new EventEmitter<any>();
    @Output() public floatingObjectRemoving = new EventEmitter<any>();
    @Output() public floatingObjectRemoved = new EventEmitter<any>();
    @Output() public pictureSelectionChanged = new EventEmitter<any>();
    @Output() public floatingObjectLoaded = new EventEmitter<any>();
    @Output() public touchToolStripOpening = new EventEmitter<any>();
    @Output() public commentChanged = new EventEmitter<any>();
    @Output() public commentRemoving = new EventEmitter<any>();
    @Output() public commentRemoved = new EventEmitter<any>();
    @Output() public slicerChanged = new EventEmitter<any>();


    @ContentChildren(WorksheetComponent)
    public sheets?: QueryList<WorksheetComponent>;

    constructor(@Inject(ElementRef) elRef: ElementRef) {
        this.elRef = elRef;
    }

    public ngAfterViewInit() {
        const elRef = this.elRef;
        const dom = elRef.nativeElement as HTMLElement;
        const hostElement = dom.querySelector('div');
        this.spread = new GC.Spread.Sheets.Workbook(hostElement, { sheetCount: 0 });
        this.setSpreadOptions();
        this.initSheets();
        (this.sheets as QueryList<WorksheetComponent>).changes.subscribe((changes) => {
            this.onSheetsChanged(changes);
        }); // may change sheets using bingidng.
        this.bindCustomEvent(this.spread);
        this.workbookInitialized.emit({ spread: this.spread });
    }

    private onSheetsChanged(sheetComponents: QueryList<WorksheetComponent>) {
        const spread = (this.spread as GC.Spread.Sheets.Workbook);
        spread.suspendPaint();
        if (sheetComponents) {
            sheetComponents.forEach((sheetComponent: WorksheetComponent, index: number) => {
                const sheet = sheetComponent.getSheet();
                if (sheet && !sheet.getParent()) {
                    spread.addSheet(index, sheetComponent.getSheet());
                    sheetComponent.onAttached();
                }
            });
        }
        spread.resumePaint();
    }

    private initSheets() {
        const sheets = this.sheets as QueryList<WorksheetComponent>;
        const spread = this.spread as GC.Spread.Sheets.Workbook;
        spread.clearSheets();
        sheets.forEach((sheetComponent, index) => {
            spread.addSheet(index, sheetComponent.getSheet());
            sheetComponent.onAttached();
        });
        // when there is no sheet, add default sheet to spread
        if (sheets.length === 0) {
            spread.addSheet(0, new GC.Spread.Sheets.Worksheet(''));
        }
    }

    private bindCustomEvent(spread: GC.Spread.Sheets.Workbook) {
        const customEventNameSpace = '.ng';
        const events = ['ValidationError', 'CellClick', 'CellDoubleClick', 'EnterCell',
            'LeaveCell', 'ValueChanged', 'TopRowChanged', 'LeftColumnChanged',
            'InvalidOperation', 'RangeFiltering', 'RangeFiltered', 'TableFiltering',
            'TableFiltered', 'RangeSorting', 'RangeSorted', 'ClipboardChanging',
            'ClipboardChanged', 'ClipboardPasting', 'ClipboardPasted', 'ColumnWidthChanging',
            'ColumnWidthChanged', 'RowHeightChanging', 'RowHeightChanged', 'DragDropBlock',
            'DragDropBlockCompleted', 'DragFillBlock', 'DragFillBlockCompleted', 'EditStarting',
            'EditChange', 'EditEnding', 'EditEnd', 'EditEnded', 'RangeGroupStateChanging',
            'RangeGroupStateChanged', 'SelectionChanging', 'SelectionChanged', 'SheetTabClick',
            'SheetTabDoubleClick', 'SheetNameChanging', 'SheetNameChanged',
            'UserZooming', 'UserFormulaEntered', 'CellChanged', 'ColumnChanged',
            'RowChanged', 'ActiveSheetChanging', 'ActiveSheetChanged',
            'SparklineChanged',
            'RangeChanged', 'ButtonClicked', 'EditorStatusChanged',
            'FloatingObjectChanged', 'FloatingObjectSelectionChanged', 'PictureChanged',
            'FloatingObjectRemoving', 'FloatingObjectRemoved', 'PictureSelectionChanged',
            'FloatingObjectLoaded', 'TouchToolStripOpening', 'CommentChanged', 'CommentRemoving', 'CommentRemoved', 'SlicerChanged'];
        events.forEach((event) => {
            spread.bind(event + customEventNameSpace, (event: any, data: any) => {
                const eventType = event.type;
                const camelCaseEvent = eventType[0].toLowerCase() + eventType.substr(1);
                (this as any)[camelCaseEvent].emit(data);
            });
        });
    }

    public setSpreadOptions() {
        const spread = this.spread as GC.Spread.Sheets.Workbook;
        if (!this.spread) {
            return;
        }
        spread.suspendEvent();
        spread.suspendPaint();
        const options = this.spreadOptions;
        options && options.forEach((option) => {
            if (option.name === 'name') {
                spread.name = option.value;
            } else {
                (spread.options as any)[option.name] = option.value;
            }
        });
        spread.resumePaint();
        spread.resumeEvent();
    }

    public ngOnChanges(changes: SimpleChanges) {
        const options = [];
        for (const changeName in changes) {
            const newValue = changes[changeName].currentValue;
            if (newValue !== null && newValue !== void 0) {
                switch (changeName) {
                    case 'hostStyle':
                        this.style = newValue;
                        break;
                    case 'hostClass':
                        break;
                    default:
                        options.push({ name: changeName, value: newValue });
                }
            }
        }
        this.spreadOptions = options;
        this.setSpreadOptions();
    }

    public ngOnDestroy() {
        (this.spread as GC.Spread.Sheets.Workbook).destroy();
    }
}

@NgModule({
    imports: [CommonModule],
    declarations: [SpreadSheetsComponent, WorksheetComponent, ColumnComponent],
    exports: [SpreadSheetsComponent, WorksheetComponent, ColumnComponent]
})
export class SpreadSheetsModule {
}
