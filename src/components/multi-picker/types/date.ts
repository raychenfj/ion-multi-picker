import moment from 'moment';
import _ from 'lodash';
import { PickerColumn } from 'ionic-angular';

import { MultiPicker } from '../multi-picker';
import { MultiPickerType, IMultiPickerTypeDateColumns } from '../multi-picker-types';
import { MultiPickerColumn } from '../multi-picker-options';
import { MultiPickerColumnDays } from '../columns/days';

export class MultiPickerTypeDate extends MultiPickerType{
  protected _columns: IMultiPickerTypeDateColumns;
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
    if (this.someSelectedIndexBlank(columns)) {
      const _moment = moment();
      [month, year] = [_moment.month() + 1, _moment.year()];
      this.setDefaultSelectedIndexes(columns, [_moment.date(), month, year]);
    } else {
      [month, year] = _.map([1, 2], numCol => parseInt(columns[numCol].options[columns[numCol].selectedIndex].value));
    }
    this.disableInvalid(columns, 'daysCol', 0, [month, year])
  }
}
