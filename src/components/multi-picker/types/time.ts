import moment from 'moment';
import { PickerColumn } from 'ionic-angular';

import { MultiPickerType, IMultiPickerTypeTimeColumns } from '../multi-picker-types';
import { MultiPickerColumnMinutes } from '../columns/minutes';
import { MultiPickerColumnHours } from '../columns/hours';


export class MultiPickerTypeTime extends MultiPickerType{
  protected _columns: IMultiPickerTypeTimeColumns;
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
    if (this.someSelectedIndexBlank(columns)) {
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
