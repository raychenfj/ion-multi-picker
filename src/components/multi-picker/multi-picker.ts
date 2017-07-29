import { AfterContentInit, Component, EventEmitter, forwardRef, HostListener, Input, OnDestroy, Optional, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PickerController, Form, Item, PickerColumn, PickerCmp, PickerColumnCmp } from 'ionic-angular';
import { MultiPickerColumn, MultiPickerOption } from './multi-picker-options';

export const MULTI_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiPicker),
  multi: true
};

@Component({
  selector: 'ion-multi-picker',
  // templateUrl: 'multi-picker.html',
  template: `<div class="multi-picker-placeholder" *ngIf="placeholder && !_text">{{placeholder}}</div>
             <div class="multi-picker-text" *ngIf="!placeholder || _text">{{_text}}</div>
             <button aria-haspopup="true" type="button" [id]="id" ion-button="item-cover" [attr.aria-labelledby]="_labelId" [attr.aria-disabled]="_disabled" class="item-cover"></button>`,
  host: {
    '[class.multi-picke-disabled]': '_disabled'
  },

  providers: [MULTI_PICKER_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
})

export class MultiPicker implements AfterContentInit, ControlValueAccessor, OnDestroy {
  _disabled: any = false;
  _labelId: string = '';
  _text: string = '';
  _fn: Function;
  _isOpen: boolean = false;
  _value: any;
  _pickerCmp: PickerCmp;
  _pickerColumnCmps: PickerColumnCmp[];
  _isDependent: boolean = false;
  _sequence: number[] = [];
  _originSelectedIndexes: number[] = []

  /**
   * @private
   */
  id: string;

  /**
   * @input {string} The text to display on the picker's cancel button. Default: `Cancel`.
   */
  @Input() cancelText: string = 'Cancel';

  /**
   * @input {string} The text to display on the picker's "Done" button. Default: `Done`.
   */
  @Input() doneText: string = 'Done';

  /**
   * @input {string} The text to display on the picker's "Reset" button. Default: `Reset`.
   */
  @Input() resetText: string = 'Reset';

  /**
   * @input {MultiPickerColumn} The columns display in the picker's panel.
   */
  @Input() multiPickerColumns: MultiPickerColumn[] = [];

  /**
   * @input {string} the character to separate values from different columns
   */
  @Input() separator: string = ' ';

  /**
   * @input {string} the character to separate values from different columns
   */
  @Input() placeholder: string = '';

  /**
   * @input {boolean} display an additional reset button
   */
  @Input() showReset: Boolean = false;

  /**
   * @output {any} Any expression to evaluate when the multi picker selection has changed.
   */
  @Output() ionChange: EventEmitter<any> = new EventEmitter();

  /**
   * @output {any} Any expression to evaluate when the multi pickker selection was cancelled.
   */
  @Output() ionCancel: EventEmitter<any> = new EventEmitter();

  constructor(private _form: Form, @Optional() private _item: Item, @Optional() private _pickerCtrl: PickerController) {
    this._form.register(this);
    if (_item) {
      this.id = 'dt-' + _item.registerInput('multi-picker');
      this._labelId = 'lbl-' + _item.id;
      this._item.setElementClass('item-multi-picker', true);
      this._value = this._value || '';
    }
  }

  @HostListener('click', ['$event'])
  _click(ev: UIEvent) {
    if (ev.detail === 0) {
      // do not continue if the click event came from a form submit
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();
    this.open();
  }

  @HostListener('keyup.space')
  _keyup() {
    if (!this._isOpen) {
      this.open();
    }
  }

  /**
   * Open the picker panel
   * @private
   */
  open() {
    if (this._disabled) {
      return;
    }

    let pickerOptions: any = {};

    let picker = this._pickerCtrl.create(pickerOptions);
    const cancel = { text: this.cancelText, role: 'multi-picker-cancel', handler: () => { this.ionCancel.emit(null); } }
    const reset = { text: this.resetText, role: 'multi-picker-reset', handler: (data: any) => { this.reset(); return false; } }
    const done = { text: this.doneText, handler: (data: any) => { this.onChange(data); this.ionChange.emit(data); } }
    pickerOptions.buttons = this.showReset ? [cancel, reset, done] : [cancel, done];

    // Determine if the picker is a dependent picker
    this._isDependent = this.multiPickerColumns.some(col => col.options.some(opt => opt.parentVal));
    this.generate(picker);

    if (this.multiPickerColumns.length > 1 && this._isDependent) {
      this.generateSequence();
      // for (let i = 0; i < picker.getColumns().length; i++) {
      //   this.validate(picker);
      // }

      picker.ionChange.subscribe(() => {
        this.validate(picker);
      });
    }

    picker.present(pickerOptions).then(() => {
      this._pickerCmp = picker.instance;
      this._pickerColumnCmps = this._pickerCmp._cols.toArray();
      this._pickerColumnCmps.forEach(col => col.lastIndex = -1)

      for (let i = 0; i < picker.getColumns().length; i++) {
        this.validate(picker);
      }
    });

    this._isOpen = true;

    picker.onDidDismiss(() => {
      this._isOpen = false;
    });
  }

  /**
   * Determine the sequence to traverse the columns
   * @private
   */
  generateSequence() {
    let hasParentCol = this.multiPickerColumns.some(col => col.parentCol !== undefined);
    // If it is a independent picker or doesn't specify parentCol, then validate the columns from left to right
    if (!this._isDependent || !hasParentCol) {
      this.multiPickerColumns.forEach((col, index) => this._sequence.push(index));
    } else {
      // If specify the parentCol, there must be a column without parentCol, which is ancestor
      let name = undefined;
      let alias = undefined;
      for (let i = 0; i < this.multiPickerColumns.length; i++) {
        let index = this.multiPickerColumns.findIndex(col => col.parentCol === name || (alias && col.parentCol === alias));
        name = this.multiPickerColumns[index].name;
        alias = this.multiPickerColumns[index].alias;
        if (index > -1) {
          this._sequence.push(index);
        }
      }
    }
  }

  /**
   * Initialize the picker panel, set selectedIndex and add columns
   * @private
   */
  generate(picker: any) {
    this._originSelectedIndexes = [];
    let values = this._value.toString().split(this.separator);
    this.multiPickerColumns.forEach((col, index) => {
      // Find the selected options, use its parentVal later
      let selectedOpt = col.options.find(option => option.value == values[index]) || col.options[0];

      let options = col.options;
      // When use as a dependent picker, only generate options which parentVal equal to value of its parent column
      if (this._isDependent) {
        // Only keep the options with same parentVal
        options = options.filter(option => option.parentVal === selectedOpt.parentVal);
      }

      // Generate picker column
      let column: any = {
        name: col.name || index.toString(),
        options: options.map(option => { return { text: option.text, value: option.value, disabled: option.disabled || false } }),
        columnWidth: col.columnWidth
      }
      // Set selectedIndex
      let selectedIndex = column.options.findIndex(option => option.value == values[index]);
      // There isn't default value, set the selectedIndex to 0
      selectedIndex = selectedIndex === -1 ? 0 : selectedIndex;
      column.selectedIndex = selectedIndex;
      this._originSelectedIndexes.push(selectedIndex);

      picker.addColumn(column);
    });

    this.divyColumns(picker);
  }

  /**
   * Validate the selected option, escpecially for dependent picker
   * @private
   */
  validate(picker: any) {
    let columns = picker.getColumns();
    for (let j = 0; j < this._sequence.length; j++) {
      let i = this._sequence[j];
      let curCol: PickerColumn = columns[i];
      let parentCol: PickerColumn = this.getParentCol(i, columns);
      if (!parentCol) continue;
      let curOption: MultiPickerOption = curCol.options[curCol.selectedIndex];

      // In case the parentCol has been changed but the selectedIndex hasn't been updated yet
      if (parentCol.selectedIndex >= parentCol.options.length) {
        parentCol.selectedIndex = parentCol.options.length - 1;
      }

      let parentOption: MultiPickerOption = parentCol.options[parentCol.selectedIndex] || {};
      let curParentVal;
      if (curOption) {
        curParentVal = this.getOptionParentValue(i, curOption);
      }
      if (curParentVal != parentOption.value) {
        curCol.options.splice(0, curCol.options.length);
        // update column options
        this.multiPickerColumns[i].options.forEach(option => {
          if (option.parentVal == parentOption.value) {
            curCol.options.push({ text: option.text, value: option.value, disabled: false });
          }
        });
        let selectedIndex = curCol.selectedIndex >= curCol.options.length ? curCol.options.length - 1 : curCol.selectedIndex;
        // Magic, using timeout to set selectedIndex after rendering
        setTimeout(() => this._pickerColumnCmps[i].setSelected(selectedIndex, 150), 0);
      }
    }
  }

  /**
   * Get parentVal for an option
   * @private
   */
  getOptionParentValue(colIndex, option) {
    return this.multiPickerColumns[colIndex].options.find(opt => opt.value == option.value).parentVal;
  }

  /**
   * Get the parentCol for a column
   */
  getParentCol(childColIndex: number, columns: PickerColumn[]): PickerColumn {
    // Get the child column's position in the sequence array
    let pos = this._sequence.findIndex(idx => idx === childColIndex);
    if (pos > 0) {
      // The parent column index is the previous element's value in the sequence array
      return columns[this._sequence[pos - 1]]
    }
    // If index = 0, then the column is a ancestor, has no parent
    return null;
  }

  /**
   * @private
   */
  divyColumns(picker: any) {
    let pickerColumns = picker.getColumns();
    let columns: number[] = [];

    pickerColumns.forEach((col, i) => {
      columns.push(0);

      col.options.forEach(opt => {
        if (opt.text.replace(/[^\x00-\xff]/g, "01").length > columns[i]) {
          columns[i] = opt.text.replace(/[^\x00-\xff]/g, "01").length;
        }
      });

    });

    if (columns.length === 2) {
      const width = Math.max(columns[0], columns[1]);
      if (!pickerColumns[0].columnWidth) {
        pickerColumns[0].columnWidth = `${width * 16}px`;
      }
      if (!pickerColumns[1].columnWidth) {
        pickerColumns[1].columnWidth = `${width * 16}px`;
      }

    } else if (columns.length === 3) {
      const width = Math.max(columns[0], columns[2]);
      if (!pickerColumns[1].columnWidth) {
        pickerColumns[1].columnWidth = `${columns[1] * 16}px`;
      }
      if (!pickerColumns[0].columnWidth) {
        pickerColumns[0].columnWidth = `${width * 16}px`;
      }
      if (!pickerColumns[2].columnWidth) {
        pickerColumns[2].columnWidth = `${width * 16}px`;
      }
    } else if (columns.length > 3) {
      columns.forEach((col, i) => {
        if (!pickerColumns[i].columnWidth) {
          pickerColumns[i].columnWidth = `${col * 12}px`;
        }
      });
    }
  }

  /**
   * @private
   */
  setValue(newData: any) {
    if (newData === null || newData === undefined) {
      this._value = '';
    } else {
      this._value = newData;
    }
  }

  /**
   * @private
   */
  getValue(): string {
    return this._value;
  }

  /**
   * @private
   */
  checkHasValue(inputValue: any) {
    if (this._item) {
      this._item.setElementClass('input-has-value', !!(inputValue && inputValue !== ''));
    }
  }

  /**
   * @private
   */
  updateText() {
    this._text = '';
    let values: string[] = this._value.toString().split(this.separator);
    this.multiPickerColumns.forEach((col, index) => {
      let option = col.options.find(option => option.value.toString() === values[index]);
      if (option) {
        this._text += `${option.text}`;
        if (index < this.multiPickerColumns.length - 1) {
          this._text += `${this.separator}`;
        }
      }
    });
    this._text = this._text.trim();
  }

  /**
   * @input {boolean} Whether or not the multi picker component is disabled. Default `false`.
   */
  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(val: boolean) {
    this._disabled = val;
    this._item && this._item.setElementClass('item-multi-picker-disabled', this._disabled);
  }

  /**
   * @private
   */
  writeValue(val: any) {
    this.setValue(val);
    this.updateText();
    this.checkHasValue(val);
  }

  /**
   * @private
   */
  ngAfterContentInit() {
    // update how the multi picker value is displayed as formatted text
    this.updateText();
  }

  /**
   * @private
   */
  registerOnChange(fn: Function): void {
    this._fn = fn;
    this.onChange = (val: any) => {
      this.setValue(this.convertObjectToString(val));
      this.updateText();
      this.checkHasValue(val);

      fn(this._value);
      this.onTouched();
    };
  }

  /**
   * @private
   */
  registerOnTouched(fn: any) { this.onTouched = fn; }

  /**
  * @private
  */
  onChange(val: any) {
    // onChange used when there is not an formControlName
    this.setValue(this.convertObjectToString(val));
    this.updateText();
    this.onTouched();
  }

  /**
  * @private
  */
  onTouched() { }

  /**
  * @private
  */
  ngOnDestroy() {
    this._form.deregister(this);
  }

  /**
  * @private Convert the picker ionChange event object data to string
  */
  convertObjectToString(newData) {
    let value = ``;
    this.multiPickerColumns.forEach((col, index) => {
      value += `${newData[col.name || index.toString()].value}`;
      if (index !== this.multiPickerColumns.length - 1) {
        value += this.separator;
      }
    });
    return value;
  }

  /**
   * @private reset the selection
   */
  reset() {
    if (!this._pickerColumnCmps) return

    if (this._isDependent) {
      const index = this._sequence.find(index => this._pickerColumnCmps[index].col.selectedIndex !== this._originSelectedIndexes[index])

      if (index === undefined) return

      this._originSelectedIndexes.forEach((index, i) => this._pickerColumnCmps[i].col.selectedIndex = index)
      this._pickerColumnCmps[index].setSelected(this._originSelectedIndexes[index], 0)
    } else {
      this._originSelectedIndexes.forEach((index, i) => this._pickerColumnCmps[i].setSelected(index, 0))
    }
  }
}
