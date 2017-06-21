"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ionic_angular_1 = require("ionic-angular");
exports.MULTI_PICKER_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultiPicker; }),
    multi: true
};
var MultiPicker = (function () {
    function MultiPicker(_form, _item, _pickerCtrl) {
        this._form = _form;
        this._item = _item;
        this._pickerCtrl = _pickerCtrl;
        this._disabled = false;
        this._labelId = '';
        this._text = '';
        this._isOpen = false;
        this._isDependent = false;
        this._sequence = [];
        this.cancelText = 'Cancel';
        this.doneText = 'Done';
        this.multiPickerColumns = [];
        this.separator = ' ';
        this.placeholder = '';
        this.ionChange = new core_1.EventEmitter();
        this.ionCancel = new core_1.EventEmitter();
        this._form.register(this);
        if (_item) {
            this.id = 'dt-' + _item.registerInput('multi-picker');
            this._labelId = 'lbl-' + _item.id;
            this._item.setElementClass('item-multi-picker', true);
            this._value = this._value || '';
        }
    }
    MultiPicker.prototype._click = function (ev) {
        if (ev.detail === 0) {
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
    MultiPicker.prototype.open = function () {
        var _this = this;
        if (this._disabled) {
            return;
        }
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
                    _this.onChange(data);
                    _this.ionChange.emit(data);
                }
            }
        ];
        this._isDependent = this.multiPickerColumns.some(function (col) { return col.options.some(function (opt) { return opt.parentVal; }); });
        this.generate(picker);
        if (this.multiPickerColumns.length > 1 && this._isDependent) {
            this.generateSequence();
            picker.ionChange.subscribe(function () {
                _this.validate(picker);
            });
        }
        picker.present(pickerOptions).then(function () {
            _this._pickerCmp = picker.instance;
            _this._pickerColumnCmps = _this._pickerCmp._cols.toArray();
            _this._pickerColumnCmps.forEach(function (col) { return col.lastIndex = -1; });
            for (var i = 0; i < picker.getColumns().length; i++) {
                _this.validate(picker);
            }
        });
        this._isOpen = true;
        picker.onDidDismiss(function () {
            _this._isOpen = false;
        });
    };
    MultiPicker.prototype.generateSequence = function () {
        var _this = this;
        var hasParentCol = this.multiPickerColumns.some(function (col) { return col.parentCol !== undefined; });
        if (!this._isDependent || !hasParentCol) {
            this.multiPickerColumns.forEach(function (col, index) { return _this._sequence.push(index); });
        }
        else {
            var name_1 = undefined;
            var alias_1 = undefined;
            for (var i = 0; i < this.multiPickerColumns.length; i++) {
                var index = this.multiPickerColumns.findIndex(function (col) { return col.parentCol === name_1 || (alias_1 && col.parentCol === alias_1); });
                name_1 = this.multiPickerColumns[index].name;
                alias_1 = this.multiPickerColumns[index].alias;
                if (index > -1) {
                    this._sequence.push(index);
                }
            }
        }
    };
    MultiPicker.prototype.generate = function (picker) {
        var _this = this;
        var values = this._value.toString().split(this.separator);
        this.multiPickerColumns.forEach(function (col, index) {
            var selectedOpt = col.options.find(function (option) { return option.value == values[index]; }) || col.options[0];
            var options = col.options;
            if (_this._isDependent) {
                options = options.filter(function (option) { return option.parentVal === selectedOpt.parentVal; });
            }
            var column = {
                name: col.name || index.toString(),
                options: options.map(function (option) { return { text: option.text, value: option.value, disabled: option.disabled || false }; }),
                columnWidth: col.columnWidth
            };
            var selectedIndex = column.options.findIndex(function (option) { return option.value == values[index]; });
            selectedIndex = selectedIndex === -1 ? 0 : selectedIndex;
            column.selectedIndex = selectedIndex;
            picker.addColumn(column);
        });
        this.divyColumns(picker);
    };
    MultiPicker.prototype.validate = function (picker) {
        var _this = this;
        var columns = picker.getColumns();
        var _loop_1 = function (j) {
            var i = this_1._sequence[j];
            var curCol = columns[i];
            var parentCol = this_1.getParentCol(i, columns);
            if (!parentCol)
                return "continue";
            var curOption = curCol.options[curCol.selectedIndex];
            if (parentCol.selectedIndex >= parentCol.options.length) {
                parentCol.selectedIndex = parentCol.options.length - 1;
            }
            var parentOption = parentCol.options[parentCol.selectedIndex] || {};
            var curParentVal = void 0;
            if (curOption) {
                curParentVal = this_1.getOptionParentValue(i, curOption);
            }
            if (curParentVal != parentOption.value) {
                curCol.options.splice(0, curCol.options.length);
                this_1.multiPickerColumns[i].options.forEach(function (option) {
                    if (option.parentVal == parentOption.value) {
                        curCol.options.push({ text: option.text, value: option.value, disabled: false });
                        var selectedIndex_1 = curCol.selectedIndex >= curCol.options.length ? curCol.options.length - 1 : curCol.selectedIndex;
                        setTimeout(function () { return _this._pickerColumnCmps[i].setSelected(selectedIndex_1, 150); }, 0);
                    }
                });
            }
        };
        var this_1 = this;
        for (var j = 0; j < this._sequence.length; j++) {
            _loop_1(j);
        }
    };
    MultiPicker.prototype.getOptionParentValue = function (colIndex, option) {
        return this.multiPickerColumns[colIndex].options.find(function (opt) { return opt.value == option.value; }).parentVal;
    };
    MultiPicker.prototype.getParentCol = function (childColIndex, columns) {
        var pos = this._sequence.findIndex(function (idx) { return idx === childColIndex; });
        if (pos > 0) {
            return columns[this._sequence[pos - 1]];
        }
        return null;
    };
    MultiPicker.prototype.divyColumns = function (picker) {
        var pickerColumns = picker.getColumns();
        var columns = [];
        pickerColumns.forEach(function (col, i) {
            columns.push(0);
            col.options.forEach(function (opt) {
                if (opt.text.replace(/[^\x00-\xff]/g, "01").length > columns[i]) {
                    columns[i] = opt.text.replace(/[^\x00-\xff]/g, "01").length;
                }
            });
        });
        if (columns.length === 2) {
            var width = Math.max(columns[0], columns[1]);
            if (!pickerColumns[0].columnWidth) {
                pickerColumns[0].columnWidth = width * 16 + "px";
            }
            if (!pickerColumns[1].columnWidth) {
                pickerColumns[1].columnWidth = width * 16 + "px";
            }
        }
        else if (columns.length === 3) {
            var width = Math.max(columns[0], columns[2]);
            if (!pickerColumns[1].columnWidth) {
                pickerColumns[1].columnWidth = columns[1] * 16 + "px";
            }
            if (!pickerColumns[0].columnWidth) {
                pickerColumns[0].columnWidth = width * 16 + "px";
            }
            if (!pickerColumns[2].columnWidth) {
                pickerColumns[2].columnWidth = width * 16 + "px";
            }
        }
        else if (columns.length > 3) {
            columns.forEach(function (col, i) {
                if (!pickerColumns[i].columnWidth) {
                    pickerColumns[i].columnWidth = col * 12 + "px";
                }
            });
        }
    };
    MultiPicker.prototype.setValue = function (newData) {
        if (newData === null || newData === undefined) {
            this._value = '';
        }
        else {
            this._value = newData;
        }
    };
    MultiPicker.prototype.getValue = function () {
        return this._value;
    };
    MultiPicker.prototype.checkHasValue = function (inputValue) {
        if (this._item) {
            this._item.setElementClass('input-has-value', !!(inputValue && inputValue !== ''));
        }
    };
    MultiPicker.prototype.updateText = function () {
        var _this = this;
        this._text = '';
        var values = this._value.toString().split(this.separator);
        this.multiPickerColumns.forEach(function (col, index) {
            var option = col.options.find(function (option) { return option.value.toString() === values[index]; });
            if (option) {
                _this._text += "" + option.text;
                if (index < _this.multiPickerColumns.length - 1) {
                    _this._text += "" + _this.separator;
                }
            }
        });
        this._text = this._text.trim();
    };
    Object.defineProperty(MultiPicker.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = val;
            this._item && this._item.setElementClass('item-multi-picker-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    MultiPicker.prototype.writeValue = function (val) {
        this.setValue(val);
        this.updateText();
        this.checkHasValue(val);
    };
    MultiPicker.prototype.ngAfterContentInit = function () {
        this.updateText();
    };
    MultiPicker.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function (val) {
            _this.setValue(_this.convertObjectToString(val));
            _this.updateText();
            _this.checkHasValue(val);
            fn(_this._value);
            _this.onTouched();
        };
    };
    MultiPicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    MultiPicker.prototype.onChange = function (val) {
        this.setValue(this.convertObjectToString(val));
        this.updateText();
        this.onTouched();
    };
    MultiPicker.prototype.onTouched = function () { };
    MultiPicker.prototype.ngOnDestroy = function () {
        this._form.deregister(this);
    };
    MultiPicker.prototype.convertObjectToString = function (newData) {
        var _this = this;
        var value = "";
        this.multiPickerColumns.forEach(function (col, index) {
            value += "" + newData[col.name || index.toString()].value;
            if (index !== _this.multiPickerColumns.length - 1) {
                value += _this.separator;
            }
        });
        return value;
    };
    return MultiPicker;
}());
MultiPicker.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ion-multi-picker',
                template: "<div class=\"multi-picker-placeholder\" *ngIf=\"placeholder && !_text\">{{placeholder}}</div>\n             <div class=\"multi-picker-text\" *ngIf=\"!placeholder || _text\">{{_text}}</div>\n             <button aria-haspopup=\"true\" type=\"button\" [id]=\"id\" ion-button=\"item-cover\" [attr.aria-labelledby]=\"_labelId\" [attr.aria-disabled]=\"_disabled\" class=\"item-cover\"></button>",
                host: {
                    '[class.multi-picke-disabled]': '_disabled'
                },
                providers: [exports.MULTI_PICKER_VALUE_ACCESSOR],
                encapsulation: core_1.ViewEncapsulation.None,
            },] },
];
MultiPicker.ctorParameters = function () { return [
    { type: ionic_angular_1.Form, },
    { type: ionic_angular_1.Item, decorators: [{ type: core_1.Optional },] },
    { type: ionic_angular_1.PickerController, decorators: [{ type: core_1.Optional },] },
]; };
MultiPicker.propDecorators = {
    'cancelText': [{ type: core_1.Input },],
    'doneText': [{ type: core_1.Input },],
    'multiPickerColumns': [{ type: core_1.Input },],
    'separator': [{ type: core_1.Input },],
    'placeholder': [{ type: core_1.Input },],
    'ionChange': [{ type: core_1.Output },],
    'ionCancel': [{ type: core_1.Output },],
    '_click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    '_keyup': [{ type: core_1.HostListener, args: ['keyup.space',] },],
    'disabled': [{ type: core_1.Input },],
};
exports.MultiPicker = MultiPicker;
//# sourceMappingURL=multi-picker.js.map