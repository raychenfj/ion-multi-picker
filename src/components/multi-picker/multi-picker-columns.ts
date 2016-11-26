import moment from 'moment';
import _ from 'lodash';
import { PickerColumn } from 'ionic-angular';

import { MultiPicker } from './multi-picker'
import { MultiPickerColumn, MultiPickerColumnDays, MultiPickerColumnMinutes, MultiPickerColumnHours } from './multi-picker-options';

export interface IMultiPickerDateColumns {
  daysCol: MultiPickerColumnDays,
  monthsCol: MultiPickerColumn,
  yearsCol: MultiPickerColumn
}

export interface IMultiPickerTimeColumns {
  hoursCol: MultiPickerColumn,
  minutesCol: MultiPickerColumn
}

export class MultiPickerColumns {
  protected _columns: IMultiPickerDateColumns |  IMultiPickerTimeColumns;

  get(): IMultiPickerDateColumns |  IMultiPickerTimeColumns {
    return this._columns
  }

  dealDoneVisibleBnt(columns: PickerColumn[], button): void {
    let isSomeDisabled = _.some(
      _.map(columns, (col, index) => col.options[col.selectedIndex].disabled)
    );
    button.cssRole = isSomeDisabled ? 'hide' : '';
  }

  protected allSelectedIndexesBlank(columns: PickerColumn[]): boolean {
    return _.every(columns.map(col => !_.isNumber(col.selectedIndex)))
  }

  protected setDefaultSelectedIndexes(columns: PickerColumn[], values: Array<number>): void {
    _(columns).each((col, i) => {
      col.selectedIndex = col.selectedIndex || _.findIndex(col.options, (option)=> option['value'] == values[i])
    })
  }

  protected disableInvalid(columns: PickerColumn[], colName: string, pickerColIndex: number, rest: Array<number>): void {
    let allowed = this._columns[colName].filter(...rest);
    _(columns[pickerColIndex].options).each(option => {
      option.disabled = !_(allowed).includes(option.value);
    });
  }
}

export class MultiPickerDateColumns extends MultiPickerColumns{
  protected _columns: IMultiPickerDateColumns;
  constructor(cmpAttrs) {
    super();
    const currentYear = moment().year();
    this._columns = {
      daysCol: new MultiPickerColumnDays('day', 1, 31, cmpAttrs.customFilterDays, cmpAttrs.weekends),
      monthsCol: new MultiPickerColumn('month', 1, 12),
      yearsCol: new MultiPickerColumn('year', currentYear - MultiPicker.YEAR_ROUND, currentYear + MultiPicker.YEAR_ROUND)
    };
  }

  validate(columns: PickerColumn[]) {
    let month: number, year: number;
    if (this.allSelectedIndexesBlank(columns)) {
      const _moment = moment();
      [month, year] = [_moment.month() + 1, _moment.year()];
      this.setDefaultSelectedIndexes(columns, [_moment.date(), month, year]);
    } else {
      [month, year] = _.map([1, 2], numCol => parseInt(columns[numCol].options[columns[numCol].selectedIndex].value));
    }
    this.disableInvalid(columns, 'daysCol', 0, [month, year])
  }
}

export class MultiPickerTimeColumns extends MultiPickerColumns{
  protected _columns: IMultiPickerTimeColumns;
  private min: moment.Moment;
  private max: moment.Moment;
  constructor(cmpAttrs) {
    super();
    [this.min, this.max] = [moment(cmpAttrs.min), moment(cmpAttrs.max)];
    let [minMinute, maxMinute] = this.max.hour() > this.min.hour() ? [0, 59] : [this.min.minute(), this.max.minute()];
    this._columns = {
      hoursCol: new MultiPickerColumnHours('hour', this.min.hour(), this.max.hour()),
      minutesCol: new MultiPickerColumnMinutes('minute', minMinute, maxMinute, this.min, this.max),
    };
  }

  validate(columns: PickerColumn[]) {
    let hour: number;
    if (this.allSelectedIndexesBlank(columns)) {
      let _moment: moment.Moment = moment();
      if (moment({hour: this.min.hour(), minute: this.min.minute()}).isAfter(_moment)) _moment = this.min;
      if (moment({hour: this.max.hour(), minute: this.max.minute()}).isBefore(_moment)) _moment = this.max;
      hour = _moment.hour();
      this.setDefaultSelectedIndexes(columns, [hour, _moment.minute()])
    } else {
      hour = columns[0].options[columns[0].selectedIndex].value;
    }
    this.disableInvalid(columns, 'minutesCol', 1, [hour])
  }

  dealDoneVisibleBnt(columns: PickerColumn[], button): void {}
}
