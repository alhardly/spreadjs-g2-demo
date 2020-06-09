"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SpreadSheetsModule = exports.SpreadSheetsComponent = exports.WorksheetComponent = exports.ColumnComponent = void 0;
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
var GC = require("@grapecity/spread-sheets");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ColumnComponent = /** @class */ (function () {
    function ColumnComponent() {
        this.changes = {};
    }
    ColumnComponent.prototype.onAttached = function (sheet, index) {
        this.sheet = sheet;
        this.index = index;
        this.onColumnChanged();
    };
    ColumnComponent.prototype.onColumnChanged = function () {
        if (this.sheet) {
            var sheet = this.sheet;
            sheet.suspendPaint();
            sheet.suspendEvent();
            var changes = this.changes;
            for (var changeName in changes) {
                var newValue = changes[changeName].currentValue;
                if (newValue === null || newValue === void 0) {
                    continue;
                }
                switch (changeName) {
                    case 'width':
                        newValue = parseInt(newValue, 10);
                        sheet.setColumnWidth(this.index, newValue);
                        break;
                    case 'visible':
                        sheet.setColumnVisible(this.index, newValue);
                        break;
                    case 'resizable':
                        sheet.setColumnResizable(this.index, newValue);
                        break;
                    case 'autoFit':
                        if (newValue) {
                            sheet.autoFitColumn(this.index);
                        }
                        break;
                    case 'style':
                        sheet.setStyle(-1, this.index, newValue);
                        break;
                    case 'headerStyle':
                        sheet.setStyle(-1, this.index, newValue, GC.Spread.Sheets.SheetArea.colHeader);
                        break;
                    case 'cellType':
                        sheet.setCellType(-1, this.index, newValue);
                        break;
                    case 'formatter':
                        sheet.setFormatter(-1, this.index, newValue, GC.Spread.Sheets.SheetArea.viewport);
                        break;
                }
            }
            sheet.resumeEvent();
            sheet.resumePaint();
        }
    };
    ColumnComponent.prototype.ngOnChanges = function (changes) {
        this.changes = {};
        var changesCache = this.changes;
        for (var changeName in changes) {
            changesCache[changeName] = changes[changeName];
        }
        this.onColumnChanged();
    };
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "dataField");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "headerText");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "resizable");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "autoFit");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "style");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "cellType");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "headerStyle");
    __decorate([
        core_1.Input()
    ], ColumnComponent.prototype, "formatter");
    ColumnComponent = __decorate([
        core_1.Component({
            selector: 'gc-column',
            template: "\n        <ng-content></ng-content>\n    "
        })
    ], ColumnComponent);
    return ColumnComponent;
}());
exports.ColumnComponent = ColumnComponent;
var WorksheetComponent = /** @class */ (function () {
    function WorksheetComponent() {
        this.sheet = new GC.Spread.Sheets.Worksheet('');
    }
    WorksheetComponent.prototype.onAttached = function () {
        var _this = this;
        var sheet = this.sheet;
        var columns = this.columns;
        sheet.suspendPaint();
        sheet.suspendEvent();
        if (this.dataSource) {
            sheet.setDataSource(this.dataSource);
            columns.forEach(function (columnComponent, index) {
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
            columns.forEach(function (columnComponent, index) {
                columnComponent.onAttached(_this.sheet, index);
            });
        }
        sheet.resumeEvent();
        sheet.resumePaint();
    };
    WorksheetComponent.prototype.getSheet = function () {
        return this.sheet;
    };
    WorksheetComponent.prototype.ngOnChanges = function (changes) {
        var sheet = this.sheet;
        sheet.suspendPaint();
        sheet.suspendEvent();
        for (var changeName in changes) {
            var newValue = changes[changeName].currentValue;
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
                    newValue.forEach(function (item) {
                        sheet.rowOutlines.group(item.index, item.count);
                    });
                    sheet.repaint();
                    break;
                case 'columnOutlineInfo':
                    newValue.forEach(function (item) {
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
                    sheet.options[changeName] = newValue;
            }
        }
        sheet.resumeEvent();
        sheet.resumePaint();
    };
    WorksheetComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.columns.changes.subscribe(function () { _this.onAttached(); });
    };
    WorksheetComponent.prototype.ngOnDestroy = function () {
        var sheet = this.sheet;
        var spread = sheet ? sheet.getParent() : null;
        if (spread) {
            var sheetIndex = spread.getSheetIndex(sheet.name());
            if (sheetIndex !== void 0) {
                spread.removeSheet(sheetIndex);
            }
        }
    };
    __decorate([
        core_1.ContentChildren(ColumnComponent)
    ], WorksheetComponent.prototype, "columns");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "rowCount");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "colCount");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "dataSource");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "frozenColumnCount");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "frozenRowCount");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "frozenTrailingRowCount");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "frozenTrailingColumnCount");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "allowCellOverflow");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "frozenlineColor");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "sheetTabColor");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "selectionPolicy");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "selectionUnit");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "zoom");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "currentTheme");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "clipBoardOptions");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "rowHeaderVisible");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "colHeaderVisible");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "rowHeaderAutoText");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "colHeaderAutoText");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "rowHeaderAutoTextIndex");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "colHeaderAutoTextIndex");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "isProtected");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "showRowOutline");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "showColumnOutline");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "selectionBackColor");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "selectionBorderColor");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "defaultStyle");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "rowOutlineInfo");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "columnOutlineInfo");
    __decorate([
        core_1.Input()
    ], WorksheetComponent.prototype, "autoGenerateColumns");
    WorksheetComponent = __decorate([
        core_1.Component({
            selector: 'gc-worksheet',
            template: "\n        <ng-content></ng-content>\n    "
        })
    ], WorksheetComponent);
    return WorksheetComponent;
}());
exports.WorksheetComponent = WorksheetComponent;
var SpreadSheetsComponent = /** @class */ (function () {
    function SpreadSheetsComponent(elRef) {
        this.style = {
            width: '800px',
            height: '600px'
        };
        // outputs events
        this.workbookInitialized = new core_1.EventEmitter();
        this.validationError = new core_1.EventEmitter();
        this.cellClick = new core_1.EventEmitter();
        this.cellDoubleClick = new core_1.EventEmitter();
        this.enterCell = new core_1.EventEmitter();
        this.leaveCell = new core_1.EventEmitter();
        this.valueChanged = new core_1.EventEmitter();
        this.topRowChanged = new core_1.EventEmitter();
        this.leftColumnChanged = new core_1.EventEmitter();
        this.invalidOperation = new core_1.EventEmitter();
        this.rangeFiltering = new core_1.EventEmitter();
        this.rangeFiltered = new core_1.EventEmitter();
        this.tableFiltering = new core_1.EventEmitter();
        this.tableFiltered = new core_1.EventEmitter();
        this.rangeSorting = new core_1.EventEmitter();
        this.rangeSorted = new core_1.EventEmitter();
        this.clipboardChanging = new core_1.EventEmitter();
        this.clipboardChanged = new core_1.EventEmitter();
        this.clipboardPasting = new core_1.EventEmitter();
        this.clipboardPasted = new core_1.EventEmitter();
        this.columnWidthChanging = new core_1.EventEmitter();
        this.columnWidthChanged = new core_1.EventEmitter();
        this.rowHeightChanging = new core_1.EventEmitter();
        this.rowHeightChanged = new core_1.EventEmitter();
        this.dragDropBlock = new core_1.EventEmitter();
        this.dragDropBlockCompleted = new core_1.EventEmitter();
        this.dragFillBlock = new core_1.EventEmitter();
        this.dragFillBlockCompleted = new core_1.EventEmitter();
        this.editStarting = new core_1.EventEmitter();
        this.editChange = new core_1.EventEmitter();
        this.editEnding = new core_1.EventEmitter();
        this.editEnd = new core_1.EventEmitter();
        this.editEnded = new core_1.EventEmitter();
        this.rangeGroupStateChanging = new core_1.EventEmitter();
        this.rangeGroupStateChanged = new core_1.EventEmitter();
        this.selectionChanging = new core_1.EventEmitter();
        this.selectionChanged = new core_1.EventEmitter();
        this.sheetTabClick = new core_1.EventEmitter();
        this.sheetTabDoubleClick = new core_1.EventEmitter();
        this.sheetNameChanging = new core_1.EventEmitter();
        this.sheetNameChanged = new core_1.EventEmitter();
        this.userZooming = new core_1.EventEmitter();
        this.userFormulaEntered = new core_1.EventEmitter();
        this.cellChanged = new core_1.EventEmitter();
        this.columnChanged = new core_1.EventEmitter();
        this.rowChanged = new core_1.EventEmitter();
        this.activeSheetChanging = new core_1.EventEmitter();
        this.activeSheetChanged = new core_1.EventEmitter();
        this.sparklineChanged = new core_1.EventEmitter();
        this.rangeChanged = new core_1.EventEmitter();
        this.buttonClicked = new core_1.EventEmitter();
        this.editorStatusChanged = new core_1.EventEmitter();
        this.floatingObjectChanged = new core_1.EventEmitter();
        this.floatingObjectSelectionChanged = new core_1.EventEmitter();
        this.pictureChanged = new core_1.EventEmitter();
        this.floatingObjectRemoving = new core_1.EventEmitter();
        this.floatingObjectRemoved = new core_1.EventEmitter();
        this.pictureSelectionChanged = new core_1.EventEmitter();
        this.floatingObjectLoaded = new core_1.EventEmitter();
        this.touchToolStripOpening = new core_1.EventEmitter();
        this.commentChanged = new core_1.EventEmitter();
        this.commentRemoving = new core_1.EventEmitter();
        this.commentRemoved = new core_1.EventEmitter();
        this.slicerChanged = new core_1.EventEmitter();
        this.elRef = elRef;
    }
    SpreadSheetsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var elRef = this.elRef;
        var dom = elRef.nativeElement;
        var hostElement = dom.querySelector('div');
        this.spread = new GC.Spread.Sheets.Workbook(hostElement, { sheetCount: 0 });
        this.setSpreadOptions();
        this.initSheets();
        this.sheets.changes.subscribe(function (changes) {
            _this.onSheetsChanged(changes);
        }); // may change sheets using bingidng.
        this.bindCustomEvent(this.spread);
        this.workbookInitialized.emit({ spread: this.spread });
    };
    SpreadSheetsComponent.prototype.onSheetsChanged = function (sheetComponents) {
        var spread = this.spread;
        spread.suspendPaint();
        if (sheetComponents) {
            sheetComponents.forEach(function (sheetComponent, index) {
                var sheet = sheetComponent.getSheet();
                if (sheet && !sheet.getParent()) {
                    spread.addSheet(index, sheetComponent.getSheet());
                    sheetComponent.onAttached();
                }
            });
        }
        spread.resumePaint();
    };
    SpreadSheetsComponent.prototype.initSheets = function () {
        var sheets = this.sheets;
        var spread = this.spread;
        spread.clearSheets();
        sheets.forEach(function (sheetComponent, index) {
            spread.addSheet(index, sheetComponent.getSheet());
            sheetComponent.onAttached();
        });
        // when there is no sheet, add default sheet to spread
        if (sheets.length === 0) {
            spread.addSheet(0, new GC.Spread.Sheets.Worksheet(''));
        }
    };
    SpreadSheetsComponent.prototype.bindCustomEvent = function (spread) {
        var _this = this;
        var customEventNameSpace = '.ng';
        var events = ['ValidationError', 'CellClick', 'CellDoubleClick', 'EnterCell',
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
        events.forEach(function (event) {
            spread.bind(event + customEventNameSpace, function (event, data) {
                var eventType = event.type;
                var camelCaseEvent = eventType[0].toLowerCase() + eventType.substr(1);
                _this[camelCaseEvent].emit(data);
            });
        });
    };
    SpreadSheetsComponent.prototype.setSpreadOptions = function () {
        var spread = this.spread;
        if (!this.spread) {
            return;
        }
        spread.suspendEvent();
        spread.suspendPaint();
        var options = this.spreadOptions;
        options && options.forEach(function (option) {
            if (option.name === 'name') {
                spread.name = option.value;
            }
            else {
                spread.options[option.name] = option.value;
            }
        });
        spread.resumePaint();
        spread.resumeEvent();
    };
    SpreadSheetsComponent.prototype.ngOnChanges = function (changes) {
        var options = [];
        for (var changeName in changes) {
            var newValue = changes[changeName].currentValue;
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
    };
    SpreadSheetsComponent.prototype.ngOnDestroy = function () {
        this.spread.destroy();
    };
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowUserResize");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowUserZoom");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowUserEditFormula");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowUserDragFill");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowUserDragDrop");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowUserDragMerge");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowUndo");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowSheetReorder");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowContextMenu");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowUserDeselect");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowCopyPasteExcelStyle");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "allowExtendPasteRange");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "cutCopyIndicatorVisible");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "cutCopyIndicatorBorderColor");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "copyPasteHeaderOptions");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "defaultDragFillType");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "enableFormulaTextbox");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "highlightInvalidData");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "newTabVisible");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "tabStripVisible");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "tabEditable");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "tabStripRatio");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "tabNavigationVisible");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "autoFitType");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "referenceStyle");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "backColor");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "grayAreaBackColor");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "resizeZeroIndicator");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "showVerticalScrollbar");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "showHorizontalScrollbar");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "scrollbarMaxAlign");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "scrollIgnoreHidden");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "hostStyle");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "hostClass");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "hideSelection");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "backgroundImage");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "backgroundImageLayout");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "showScrollTip");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "showResizeTip");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "showDragDropTip");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "showDragFillTip");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "showDragFillSmartTag");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "scrollbarShowMax");
    __decorate([
        core_1.Input()
    ], SpreadSheetsComponent.prototype, "useTouchLayout");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "workbookInitialized");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "validationError");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "cellClick");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "cellDoubleClick");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "enterCell");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "leaveCell");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "valueChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "topRowChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "leftColumnChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "invalidOperation");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rangeFiltering");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rangeFiltered");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "tableFiltering");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "tableFiltered");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rangeSorting");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rangeSorted");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "clipboardChanging");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "clipboardChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "clipboardPasting");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "clipboardPasted");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "columnWidthChanging");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "columnWidthChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rowHeightChanging");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rowHeightChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "dragDropBlock");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "dragDropBlockCompleted");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "dragFillBlock");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "dragFillBlockCompleted");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "editStarting");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "editChange");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "editEnding");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "editEnd");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "editEnded");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rangeGroupStateChanging");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rangeGroupStateChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "selectionChanging");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "selectionChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "sheetTabClick");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "sheetTabDoubleClick");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "sheetNameChanging");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "sheetNameChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "userZooming");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "userFormulaEntered");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "cellChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "columnChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rowChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "activeSheetChanging");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "activeSheetChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "sparklineChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "rangeChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "buttonClicked");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "editorStatusChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "floatingObjectChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "floatingObjectSelectionChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "pictureChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "floatingObjectRemoving");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "floatingObjectRemoved");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "pictureSelectionChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "floatingObjectLoaded");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "touchToolStripOpening");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "commentChanged");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "commentRemoving");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "commentRemoved");
    __decorate([
        core_1.Output()
    ], SpreadSheetsComponent.prototype, "slicerChanged");
    __decorate([
        core_1.ContentChildren(WorksheetComponent)
    ], SpreadSheetsComponent.prototype, "sheets");
    SpreadSheetsComponent = __decorate([
        core_1.Component({
            selector: 'gc-spread-sheets',
            template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"hostClass\">\n            <ng-content></ng-content>\n        </div>\n    "
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], SpreadSheetsComponent);
    return SpreadSheetsComponent;
}());
exports.SpreadSheetsComponent = SpreadSheetsComponent;
var SpreadSheetsModule = /** @class */ (function () {
    function SpreadSheetsModule() {
    }
    SpreadSheetsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [SpreadSheetsComponent, WorksheetComponent, ColumnComponent],
            exports: [SpreadSheetsComponent, WorksheetComponent, ColumnComponent]
        })
    ], SpreadSheetsModule);
    return SpreadSheetsModule;
}());
exports.SpreadSheetsModule = SpreadSheetsModule;
