"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
// import { Config } from '../../config/config';
var ionic_angular_1 = require('ionic-angular');
// import { PickerColumn, PickerColumnOption } from '../picker/picker-options';
// import { dateValueRange, renderDateTime, renderTextFormat, convertFormatToKey, getValueFromFormat, parseTemplate, parseDate, updateDate, DateTimeData, convertDataToISO, daysInMonth, dateSortValue, dateDataSortValue, LocaleData } from 'ionic-angular';
// export const DATETIME_VALUE_ACCESSOR = new Provider(
//     NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => DateTime), multi: true});
var MultiPicker = (function () {
    function MultiPicker(_form, 
        // private _config: Config,
        _item, _pickerCtrl) {
        this._form = _form;
        this._item = _item;
        this._pickerCtrl = _pickerCtrl;
        this._disabled = false;
        this._text = '';
        this._isOpen = false;
        /**
         * @input {string} The text to display on the picker's cancel button. Default: `Cancel`.
         */
        this.cancelText = 'Cancel';
        /**
         * @input {string} The text to display on the picker's "Done" button. Default: `Done`.
         */
        this.doneText = 'Done';
        // @Input() pickerOptions: any = {};
        /**
         * @output {any} Any expression to evaluate when the datetime selection has changed.
         */
        this.ionChange = new core_1.EventEmitter();
        /**
         * @output {any} Any expression to evaluate when the datetime selection was cancelled.
         */
        this.ionCancel = new core_1.EventEmitter();
        this._form.register(this);
        if (_item) {
            this.id = 'dt-' + _item.registerInput('datetime');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-datetime', true);
        }
    }
    MultiPicker.prototype._click = function (ev) {
        if (ev.detail === 0) {
            // do not continue if the click event came from a form submit
            return;
        }
        ev.preventDefault();
        ev.stopPropagation();
        this.open();
    };
    MultiPicker.prototype._keyup = function () {
        if (!this._isOpen) {
            this.open();
        }
    };
    /**
     * @private
     */
    MultiPicker.prototype.open = function () {
        var _this = this;
        if (this._disabled) {
            return;
        }
        console.debug('datetime, open picker');
        // the user may have assigned some options specifically for the alert
        var pickerOptions = {};
        var picker = this._pickerCtrl.create(pickerOptions);
        pickerOptions.buttons = [
            {
                text: this.cancelText,
                role: 'cancel',
                handler: function () {
                    _this.ionCancel.emit(null);
                }
            },
            {
                text: this.doneText,
                handler: function (data) {
                    console.log('datetime, done', data);
                    _this.onChange(data);
                    _this.ionChange.emit(data);
                }
            }
        ];
        this.generate(picker);
        this.validate(picker);
        picker.ionChange.subscribe(function () {
            _this.validate(picker);
        });
        picker.present(pickerOptions);
        this._isOpen = true;
        picker.onDidDismiss(function () {
            _this._isOpen = false;
        });
    };
    /**
     * @private
     */
    MultiPicker.prototype.generate = function (picker) {
        // // if a picker format wasn't provided, then fallback
        // // to use the display format
        // let template = this.pickerFormat || this.displayFormat;
        // if (isPresent(template)) {
        //   // make sure we've got up to date sizing information
        //   this.calcMinMax();
        //   // does not support selecting by day name
        //   // automaticallly remove any day name formats
        //   template = template.replace('DDDD', '{~}').replace('DDD', '{~}');
        //   if (template.indexOf('D') === -1) {
        //     // there is not a day in the template
        //     // replace the day name with a numeric one if it exists
        //     template = template.replace('{~}', 'D');
        //   }
        //   // make sure no day name replacer is left in the string
        //   template = template.replace(/{~}/g, '');
        //   // parse apart the given template into an array of "formats"
        //   parseTemplate(template).forEach(format => {
        //     // loop through each format in the template
        //     // create a new picker column to build up with data
        //     let key = convertFormatToKey(format);
        //     let values: any[];
        //     // first see if they have exact values to use for this input
        //     if (isPresent(this[key + 'Values'])) {
        //       // user provide exact values for this date part
        //       values = convertToArrayOfNumbers(this[key + 'Values'], key);
        //     } else {
        //       // use the default date part values
        //       values = dateValueRange(format, this._min, this._max);
        //     }
        //     let column: PickerColumn = {
        //       name: key,
        //       options: values.map(val => {
        //         return {
        //           value: val,
        //           text: renderTextFormat(format, val, null, this._locale),
        //         };
        //       })
        //     };
        //     if (column.options.length) {
        //       // cool, we've loaded up the columns with options
        //       // preselect the option for this column
        //       var selected = column.options.find(opt => opt.value === getValueFromFormat(this._value, format));
        //       if (selected) {
        //         // set the select index for this column's options
        //         column.selectedIndex = column.options.indexOf(selected);
        //       }
        //       // add our newly created column to the picker
        //       picker.addColumn(column);
        //     }
        //   });
        //   this.divyColumns(picker);
        // }
    };
    /**
     * @private
     */
    MultiPicker.prototype.validate = function (picker) {
        // let i: number;
        // let today = new Date();
        // let columns = picker.getColumns();
        // // find the columns used
        // let yearCol = columns.find(col => col.name === 'year');
        // let monthCol = columns.find(col => col.name === 'month');
        // let dayCol = columns.find(col => col.name === 'day');
        // let yearOpt: PickerColumnOption;
        // let monthOpt: PickerColumnOption;
        // let dayOpt: PickerColumnOption;
        // // default to assuming today's year
        // let selectedYear = today.getFullYear();
        // if (yearCol) {
        //   yearOpt = yearCol.options[yearCol.selectedIndex];
        //   if (yearOpt) {
        //     // they have a selected year value
        //     selectedYear = yearOpt.value;
        //   }
        // }
        // // default to assuming this month has 31 days
        // let numDaysInMonth = 31;
        // let selectedMonth: number;
        // if (monthCol) {
        //   monthOpt = monthCol.options[monthCol.selectedIndex];
        //   if (monthOpt) {
        //     // they have a selected month value
        //     selectedMonth = monthOpt.value;
        //     // calculate how many days are in this month
        //     numDaysInMonth = daysInMonth(selectedMonth, selectedYear);
        //   }
        // }
        // // create sort values for the min/max datetimes
        // let minCompareVal = dateDataSortValue(this._min);
        // let maxCompareVal = dateDataSortValue(this._max);
        // if (monthCol) {
        //   // enable/disable which months are valid
        //   // to show within the min/max date range
        //   for (i = 0; i < monthCol.options.length; i++) {
        //     monthOpt = monthCol.options[i];
        //     // loop through each month and see if it
        //     // is within the min/max date range
        //     monthOpt.disabled = (dateSortValue(selectedYear, monthOpt.value, 31) < minCompareVal ||
        //                          dateSortValue(selectedYear, monthOpt.value, 1) > maxCompareVal);
        //   }
        // }
        // if (dayCol) {
        //   if (isPresent(selectedMonth)) {
        //     // enable/disable which days are valid
        //     // to show within the min/max date range
        //     for (i = 0; i < 31; i++) {
        //       dayOpt = dayCol.options[i];
        //       // loop through each day and see if it
        //       // is within the min/max date range
        //       var compareVal = dateSortValue(selectedYear, selectedMonth, dayOpt.value);
        //       dayOpt.disabled = (compareVal < minCompareVal ||
        //                          compareVal > maxCompareVal ||
        //                          numDaysInMonth <= i);
        //     }
        //   } else {
        //     // enable/disable which numbers of days to show in this month
        //     for (i = 0; i < 31; i++) {
        //       dayCol.options[i].disabled = (numDaysInMonth <= i);
        //     }
        //   }
        // }
        // picker.refresh();
    };
    /**
     * @private
     */
    //   divyColumns(picker: Picker) {
    //     let pickerColumns = picker.getColumns();
    //     let columns: number[] = [];
    //     pickerColumns.forEach((col, i) => {
    //       columns.push(0);
    //       col.options.forEach(opt => {
    //         if (opt.text.length > columns[i]) {
    //           columns[i] = opt.text.length;
    //         }
    //       });
    //     });
    //     if (columns.length === 2) {
    //       var width = Math.max(columns[0], columns[1]);
    //       pickerColumns[0].columnWidth = pickerColumns[1].columnWidth = `${width * 16}px`;
    //     } else if (columns.length === 3) {
    //       var width = Math.max(columns[0], columns[2]);
    //       pickerColumns[1].columnWidth = `${columns[1] * 16}px`;
    //       pickerColumns[0].columnWidth = pickerColumns[2].columnWidth = `${width * 16}px`;
    //     } else if (columns.length > 3) {
    //       columns.forEach((col, i) => {
    //         pickerColumns[i].columnWidth = `${col * 12}px`;
    //       });
    //     }
    //   }
    //   /**
    //    * @private
    //    */
    MultiPicker.prototype.setValue = function (newData) {
        // updateDate(this._value, newData);
    };
    //   /**
    //    * @private
    //    */
    //   getValue(): DateTimeData {
    //     return this._value;
    //   }
    //   /**
    //    * @private
    //    */
    //   checkHasValue(inputValue: any) {
    //     if (this._item) {
    //       this._item.setCssClass('input-has-value', !!(inputValue && inputValue !== ''));
    //     }
    //   }
    //   /**
    //    * @private
    //    */
    MultiPicker.prototype.updateText = function () {
        // create the text of the formatted data
        // this._text = renderDateTime(this.displayFormat, this._value, this._locale);
    };
    //   /**
    //    * @private
    //    */
    //   calcMinMax() {
    //     let todaysYear = new Date().getFullYear();
    //     if (isBlank(this.min)) {
    //       if (isPresent(this.yearValues)) {
    //         this.min = Math.min.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'));
    //       } else {
    //         this.min = (todaysYear - 100).toString();
    //       }
    //     }
    //     if (isBlank(this.max)) {
    //       if (isPresent(this.yearValues)) {
    //         this.max = Math.max.apply(Math, convertToArrayOfNumbers(this.yearValues, 'year'));
    //       } else {
    //         this.max = todaysYear.toString();
    //       }
    //     }
    //     let min = this._min = parseDate(this.min);
    //     let max = this._max = parseDate(this.max);
    //     min.month = min.month || 1;
    //     min.day = min.day || 1;
    //     min.hour = min.hour || 0;
    //     min.minute = min.minute || 0;
    //     min.second = min.second || 0;
    //     max.month = max.month || 12;
    //     max.day = max.day || 31;
    //     max.hour = max.hour || 23;
    //     max.minute = max.minute || 59;
    //     max.second = max.second || 59;
    //   }
    //   /**
    //    * @input {boolean} Whether or not the datetime component is disabled. Default `false`.
    //    */
    //   @Input()
    //   get disabled() {
    //     return this._disabled;
    //   }
    //   set disabled(val) {
    //     this._disabled = isTrueProperty(val);
    //     this._item && this._item.setCssClass('item-datetime-disabled', this._disabled);
    //   }
    //   /**
    //    * @private
    //    */
    //   writeValue(val: any) {
    //     console.debug('datetime, writeValue', val);
    //     this.setValue(val);
    //     this.updateText();
    //     this.checkHasValue(val);
    //   }
    //   /**
    //    * @private
    //    */
    //   ngAfterContentInit() {
    //     // first see if locale names were provided in the inputs
    //     // then check to see if they're in the config
    //     // if neither were provided then it will use default English names
    //     ['monthNames', 'monthShortNames', 'dayNames', 'dayShortNames'].forEach(type => {
    //       this._locale[type] = convertToArrayOfStrings(isPresent(this[type]) ? this[type] : this._config.get(type), type);
    //     });
    //     // update how the datetime value is displayed as formatted text
    //     this.updateText();
    //   }
    //   /**
    //    * @private
    //    */
    //   registerOnChange(fn: Function): void {
    //     this._fn = fn;
    //     this.onChange = (val: any) => {
    //       console.debug('datetime, onChange', val);
    //       this.setValue(val);
    //       this.updateText();
    //       this.checkHasValue(val);
    //       // convert DateTimeData value to iso datetime format
    //       fn(convertDataToISO(this._value));
    //       this.onTouched();
    //     };
    //   }
    //   /**
    //    * @private
    //    */
    //   registerOnTouched(fn: any) { this.onTouched = fn; }
    //   /**
    //    * @private
    //    */
    MultiPicker.prototype.onChange = function (val) {
        // onChange used when there is not an formControlName
        console.debug('datetime, onChange w/out formControlName', val);
        this.setValue(val);
        this.updateText();
        this.onTouched();
    };
    //   /**
    //    * @private
    //    */
    MultiPicker.prototype.onTouched = function () { };
    //   /**
    //    * @private
    //    */
    MultiPicker.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultiPicker.prototype, "cancelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultiPicker.prototype, "doneText", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MultiPicker.prototype, "ionChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], MultiPicker.prototype, "ionCancel", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [UIEvent]), 
        __metadata('design:returntype', void 0)
    ], MultiPicker.prototype, "_click", null);
    __decorate([
        core_1.HostListener('keyup.space'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], MultiPicker.prototype, "_keyup", null);
    MultiPicker = __decorate([
        core_1.Component({
            selector: 'ion-multi-selector',
            template: "\n    <div class=\"datetime-text\">{{_text}}</div>\n    <button ion-button=\"item-cover\" \n            aria-haspopup=\"true\"\n            type=\"button\"\n            [id]=\"id\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\">\n    </button>\n  ",
            host: {
                '[class.datetime-disabled]': '_disabled'
            },
            // providers: [DATETIME_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [ionic_angular_1.Form, ionic_angular_1.Item, ionic_angular_1.PickerController])
    ], MultiPicker);
    return MultiPicker;
}());
exports.MultiPicker = MultiPicker;
