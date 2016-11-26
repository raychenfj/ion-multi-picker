import _ from 'lodash';
import { PickerColumn } from 'ionic-angular';

import { MultiPickerColumn } from './multi-picker-options';
import { MultiPickerColumnDays } from './columns/days';

export interface IMultiPickerTypeDateColumns {
  daysCol: MultiPickerColumnDays,
  monthsCol: MultiPickerColumn,
  yearsCol: MultiPickerColumn
}

export interface IMultiPickerTypeTimeColumns {
  hoursCol: MultiPickerColumn,
  minutesCol: MultiPickerColumn
}

export class MultiPickerType {
  protected _columns: IMultiPickerTypeDateColumns |  IMultiPickerTypeTimeColumns;

  get(): IMultiPickerTypeDateColumns |  IMultiPickerTypeTimeColumns {
    return this._columns
  }

  dealDoneVisibleBnt(columns: PickerColumn[], button): void {
    let isSomeDisabled = _.some(
      _.map(columns, (col, index) => col.options[col.selectedIndex].disabled)
    );
    button.cssRole = isSomeDisabled ? 'hide' : '';
  }

  protected someSelectedIndexBlank(columns: PickerColumn[]): boolean {
    return _.some(columns.map(col => {
      let isNumber = _.isNumber(col.selectedIndex);
      return !isNumber || isNumber && col.selectedIndex < 0
    }))
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
