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
var forms_1 = require('@angular/forms');
var ionic_angular_1 = require('ionic-angular');
exports.MULTI_PICKER_VALUE_ACCESSOR = new core_1.Provider(forms_1.NG_VALUE_ACCESSOR, { useExisting: core_1.forwardRef(function () { return MultiPicker; }), multi: true });
var MultiPicker = (function () {
    function MultiPicker(_form, _item, _pickerCtrl) {
        this._form = _form;
        this._item = _item;
        this._pickerCtrl = _pickerCtrl;
        this._disabled = false;
        this._labelId = '';
        this._text = '';
        this._isOpen = false;
        this._value = '';
        /**
         * @private
         */
        /**
         * @input {string} The text to display on the picker's cancel button. Default: `Cancel`.
         */
        this.cancelText = 'Cancel';
        /**
         * @input {string} The text to display on the picker's "Done" button. Default: `Done`.
         */
        this.doneText = 'Done';
        /**
         * @input
         */
        this.multiPickerColumns = [];
        /**
         * @output {any} Any expression to evaluate when the multi picker selection has changed.
         */
        this.ionChange = new core_1.EventEmitter();
        /**
         * @output {any} Any expression to evaluate when the multi pickker selection was cancelled.
         */
        this.ionCancel = new core_1.EventEmitter();
        this._form.register(this);
        if (_item) {
            this.id = 'dt-' + _item.registerInput('multi-picker');
            this._labelId = 'lbl-' + _item.id;
            this._item.setCssClass('item-multi-picker', true);
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
        console.debug('multi picker, open picker');
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
                    console.log('multi picker, done', data);
                    _this.onChange(data);
                    _this.ionChange.emit(data);
                }
            }
        ];
        this.generate(picker);
        for (var i = 0; i < picker.getColumns().length; i++) {
            this.validate(picker);
        }
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
        var values = this._value.split(' ');
        this.multiPickerColumns.forEach(function (col, index) {
            if (index > 0) {
                col.options = col.options.sort(function (a, b) {
                    a.parentVal;
                    b.parentVal;
                    if (a.parentVal != b.parentVal) {
                        if (!a.parentVal) {
                            return 1;
                        }
                        if (!b.parentVal) {
                            return -1;
                        }
                        else {
                            return a.parentVal - b.parentVal;
                        }
                    }
                    else {
                        return a.value - b.value;
                    }
                });
            }
            var selectedIndex = col.options.findIndex(function (option) { return option.value == values[index]; });
            var column = {
                name: col.name || index.toString(),
                options: col.options.map(function (option) { return { text: option.text, value: option.value, disabled: false }; }),
                selectedIndex: selectedIndex != -1 ? selectedIndex : 0
            };
            picker.addColumn(column);
        });
        this.divyColumns(picker);
    };
    /**
     * @private
     */
    MultiPicker.prototype.validate = function (picker) {
        var _this = this;
        var columns = picker.getColumns();
        var _loop_1 = function(i) {
            var curCol = columns[i];
            var preCol = columns[i - 1];
            var curOption = curCol.options[curCol.selectedIndex];
            var preOption = preCol.options[preCol.selectedIndex];
            var selectedOptionWillChanged = false;
            var curParentVal = this_1.getOptionParentValue(i, curOption);
            if (curParentVal && curParentVal != preOption.value) {
                selectedOptionWillChanged = true;
            }
            if (selectedOptionWillChanged) {
                curCol.options.forEach(function (option, index) {
                    var parentVal = _this.getOptionParentValue(i, option);
                    option.disabled = parentVal != preOption.value || index > curCol.options.findIndex(function (opt) { return _this.getOptionParentValue(i, opt) == preOption.value; });
                });
                return "break";
            }
            else {
                curCol.options.forEach(function (option, index) {
                    var parentVal = _this.getOptionParentValue(i, option);
                    option.disabled = parentVal != null && parentVal != preOption.value;
                });
            }
        };
        var this_1 = this;
        for (var i = 1; i < columns.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break") break;
        }
        picker.refresh();
    };
    MultiPicker.prototype.getOptionParentValue = function (colIndex, option) {
        return this.multiPickerColumns[colIndex].options.find(function (opt) { return opt.value == option.value; }).parentVal;
    };
    /**
     * @private
     */
    MultiPicker.prototype.divyColumns = function (picker) {
        var pickerColumns = picker.getColumns();
        var columns = [];
        pickerColumns.forEach(function (col, i) {
            columns.push(0);
            col.options.forEach(function (opt) {
                if (opt.text.length > columns[i]) {
                    columns[i] = opt.text.length;
                }
            });
        });
        if (columns.length === 2) {
            var width = Math.max(columns[0], columns[1]);
            pickerColumns[0].columnWidth = pickerColumns[1].columnWidth = width * 16 + "px";
        }
        else if (columns.length === 3) {
            var width = Math.max(columns[0], columns[2]);
            pickerColumns[1].columnWidth = columns[1] * 16 + "px";
            pickerColumns[0].columnWidth = pickerColumns[2].columnWidth = width * 16 + "px";
        }
        else if (columns.length > 3) {
            columns.forEach(function (col, i) {
                pickerColumns[i].columnWidth = col * 12 + "px";
            });
        }
    };
    /**
     * @private
     */
    MultiPicker.prototype.setValue = function (newData) {
        this._value = newData || '';
    };
    /**
     * @private
     */
    MultiPicker.prototype.getValue = function () {
        return this._value;
    };
    /**
     * @private
     */
    MultiPicker.prototype.checkHasValue = function (inputValue) {
        if (this._item) {
            this._item.setCssClass('input-has-value', !!(inputValue && inputValue !== ''));
        }
    };
    /**
     * @private
     */
    MultiPicker.prototype.updateText = function () {
        var _this = this;
        this._text = '';
        var values = this._value.split(' ');
        this.multiPickerColumns.forEach(function (col, index) {
            var option = col.options.find(function (option) { return option.value == values[index]; });
            if (option) {
                _this._text += option.text + " ";
            }
        });
        this._text.trim();
    };
    Object.defineProperty(MultiPicker.prototype, "disabled", {
        /**
         * @input {boolean} Whether or not the multi picker component is disabled. Default `false`.
         */
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = val;
            this._item && this._item.setCssClass('item-multi-picker-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    MultiPicker.prototype.writeValue = function (val) {
        console.debug('multi picker, writeValue', val);
        this.setValue(val);
        this.updateText();
        this.checkHasValue(val);
    };
    /**
     * @private
     */
    MultiPicker.prototype.ngAfterContentInit = function () {
        // update how the multi picker value is displayed as formatted text
        this.updateText();
    };
    /**
     * @private
     */
    MultiPicker.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (val) {
            console.debug('datetime, onChange', val);
            _this.setValue(_this.convertObjectToString(val));
            _this.updateText();
            _this.checkHasValue(val);
            fn(_this._value);
            _this.onTouched();
        };
    };
    /**
     * @private
     */
    MultiPicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
    * @private
    */
    MultiPicker.prototype.onChange = function (val) {
        // onChange used when there is not an formControlName
        console.debug('multi picker, onChange w/out formControlName', val);
        this.setValue(this.convertObjectToString(val));
        this.updateText();
        this.onTouched();
    };
    /**
    * @private
    */
    MultiPicker.prototype.onTouched = function () { };
    /**
    * @private
    */
    MultiPicker.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    /**
    * @private convert the Picker ionChange event object data to string
    */
    MultiPicker.prototype.convertObjectToString = function (newData) {
        var value = "";
        this.multiPickerColumns.forEach(function (col, index) {
            value += newData[col.name || index.toString()].value + " ";
        });
        return value.trim();
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
        core_1.Input(), 
        __metadata('design:type', Array)
    ], MultiPicker.prototype, "multiPickerColumns", void 0);
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MultiPicker.prototype, "disabled", null);
    MultiPicker = __decorate([
        core_1.Component({
            selector: 'ion-multi-picker',
            template: "\n    <div class=\"multi-picker-text\" >{{_text}}</div>\n    <button \n            category=\"item-cover\"\n            class=\"item-cover item-cover-default\" \n            aria-haspopup=\"true\"\n            type=\"button\"\n            [id]=\"id\"\n            [attr.aria-labelledby]=\"_labelId\"\n            [attr.aria-disabled]=\"_disabled\">\n            <span class=\"botton-inener\">\n            </span>\n            <ion-button-effect></ion-button-effect>\n    </button>\n  ",
            host: {
                '[class.multi-picke-disabled]': '_disabled'
            },
            directives: [ionic_angular_1.IONIC_DIRECTIVES],
            providers: [exports.MULTI_PICKER_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None,
        }),
        __param(1, core_1.Optional()),
        __param(2, core_1.Optional()), 
        __metadata('design:paramtypes', [ionic_angular_1.Form, ionic_angular_1.Item, ionic_angular_1.PickerController])
    ], MultiPicker);
    return MultiPicker;
}());
exports.MultiPicker = MultiPicker;
