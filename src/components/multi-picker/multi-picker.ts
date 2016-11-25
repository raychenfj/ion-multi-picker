import { AfterContentInit, Component, EventEmitter, forwardRef, HostListener, Input, OnDestroy, Optional, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Picker, PickerController, Form, Item } from 'ionic-angular';
import _ from 'lodash';
import moment from 'moment';
import { MultiPickerColumn, MultiPickerColumnDays, IMultiPickerOption } from './multi-picker-options';

export const MULTI_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiPicker),
  multi: true
};

interface IMultiPickerColumns {
  daysCol: MultiPickerColumnDays,
  monthsCol: MultiPickerColumn,
  yearsCol: MultiPickerColumn
}

@Component({
  selector: 'ion-multi-picker',
  template: '<div class="multi-picker-text">{{_text}}</div>' +
  '<button aria-haspopup="true" ' +
  'type="button" ' +
  '[id]="id" ' +
  'ion-button="item-cover" ' +
  '[attr.aria-labelledby]="_labelId" ' +
  '[attr.aria-disabled]="_disabled" ' +
  'class="item-cover">' +
  '</button>',
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

  /**
   * @private
   */
  id: string;
  multiPickerColumns: IMultiPickerColumns;

  /**
   * @input {string} The text to display on the picker's cancel button. Default: `Cancel`.
   */
  @Input() cancelText: string = 'Cancel';

  /**
   * @input {string} The text to display on the picker's "Done" button. Default: `Done`.
   */
  @Input() doneText: string = 'Done';

  /**
   * @input
   */
  @Input('filterDays') customFilterDays: Function;
  @Input() weekends: string|string[];
  @Input() displayFormat: string = 'DD.MM.YYYY';
  /**
   * @output {any} Any expression to evaluate when the multi picker selection has changed.
   */
  @Output() ionChange: EventEmitter<any> = new EventEmitter();

  /**
   * @output {any} Any expression to evaluate when the multi pickker selection was cancelled.
   */
  @Output() ionCancel: EventEmitter<any> = new EventEmitter();

  constructor(
    private _form: Form,
    @Optional() private _item: Item,
    @Optional() private _pickerCtrl: PickerController
  ) {
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
    pickerOptions.buttons = [
      {
        text: this.cancelText,
        role: 'cancel',
        handler: () => {
          this.ionCancel.emit(null);
        }
      },
      {
        text: this.doneText,
        handler: (data: any) => {
          this.onChange(data);
          this.ionChange.emit(data);
        }
      }
    ];

    this.generate(picker);

    for (let i = 0; i < picker.getColumns().length; i++) {
      this.validate(picker);
    }

    picker.ionChange.subscribe(() => {
      this.validate(picker);
    });
    picker.present(pickerOptions);

    this._isOpen = true;
    picker.onDidDismiss(() => {
      this._isOpen = false;
    });
  }

  toVals(options: IMultiPickerOption[]): number[] {
    return _.map(options, option => parseInt(option.value))
  }

  generate(picker: Picker) {
    const currentYear = moment().year();
    this.multiPickerColumns = {
      daysCol: new MultiPickerColumnDays('day', 1, 31, this.customFilterDays, this.weekends),
      monthsCol: new MultiPickerColumn('month', 1, 12),
      yearsCol: new MultiPickerColumn('year', currentYear - 2, currentYear + 2)
    };

    _.each(this.multiPickerColumns, (col, key) => {
      let selectedIndex = this.selectedOptionIndex(col);
      if (key == 'monthsCol') selectedIndex++;
      picker.addColumn({
        name: col.name,
        options: col.options,
        selectedIndex: selectedIndex
      })
    });
    this.divyColumns(picker);
  }

  validate(picker: Picker) {
    let columns = picker.getColumns();
    let month: number, year: number;
    if (_.some(columns.map(col => !col.selectedIndex))) {
      [month, year] = [moment().month() + 1, moment().year()];
      let day = moment().date();
      _(columns).each((col, i) => {
        col.selectedIndex = col.selectedIndex || _.findIndex(col.options, (option)=> option['value'] == [day, month, year][i])
      })
    } else {
      [month, year] = _.map([1, 2], numCol => parseInt(columns[numCol].options[columns[numCol].selectedIndex].value));
    }
    let allowedDays = this.multiPickerColumns.daysCol.filter(month, year);
    _(columns[0].options).each(dayOption => {
      dayOption.disabled = !_(allowedDays).includes(parseInt(dayOption.value));
    });

    let isSomeDisabled = _.some(
      _.map(columns, (col, index) => col.options[col.selectedIndex].disabled)
    );
    picker.data.buttons[1].cssRole = isSomeDisabled ? 'hide' : '';
    picker.refresh();
  }

  selectedOptionIndex(col: MultiPickerColumn): number {
    if (this._value) {
      let value = moment(this._value);
      let selectedValue = value[col.momentName]();
      return _.findIndex(col.options, (option)=> option['value'] == selectedValue)
    }
  }

  divyColumns(picker: Picker) {
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
      var width = Math.max(columns[0], columns[1]);
      pickerColumns[0].columnWidth = pickerColumns[1].columnWidth = `${width * 16}px`;

    } else if (columns.length === 3) {
      var width = Math.max(columns[0], columns[2]);
      pickerColumns[1].columnWidth = `${columns[1] * 16}px`;
      pickerColumns[0].columnWidth = pickerColumns[2].columnWidth = `${width * 16}px`;

    } else if (columns.length > 3) {
      columns.forEach((col, i) => {
        pickerColumns[i].columnWidth = `${col * 12}px`;
      });
    }
  }

  setValue(newData: any) {
    if(newData=== null || newData === undefined){
      this._value = '';
    }else{
      this._value = newData;
    }
  }

  getValue(): string {
    return this._value;
  }

  checkHasValue(inputValue: any) {
    if (this._item) {
      this._item.setElementClass('input-has-value', !!(inputValue && inputValue !== ''));
    }
  }

  updateText() {
    this._text = this._value? moment(this._value).format(this.displayFormat) : '';
  }

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(val: boolean) {
    this._disabled = val;
    this._item && this._item.setElementClass('item-multi-picker-disabled', this._disabled);
  }

  writeValue(val: any) {
    this.setValue(val);
    this.updateText();
    this.checkHasValue(val);
  }

  ngAfterContentInit() {
    // update how the multi picker value is displayed as formatted text
    this.updateText();
  }

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

  registerOnTouched(fn: any) { this.onTouched = fn; }

  onChange(val: any) {
    // onChange used when there is not an formControlName
    this.setValue(this.convertObjectToString(val));
    this.updateText();
    this.onTouched();
  }

  onTouched() { }

  ngOnDestroy() {
    this._form.deregister(this);
  }

  /**
  * @private convert the Picker ionChange event object data to string
  */
  convertObjectToString(newData) {
    let newMomentObj = _.mapValues(newData, (timepart)=> timepart['value']);
    newMomentObj.month--;
    return moment(newMomentObj).format();
  }
}
