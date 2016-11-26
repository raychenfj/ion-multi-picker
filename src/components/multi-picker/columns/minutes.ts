import _ from 'lodash';
import moment from 'moment';

import { MultiPickerColumn, IMultiPickerColumn } from '../multi-picker-columns';

export class MultiPickerColumnMinutes extends MultiPickerColumn implements IMultiPickerColumn {
  existingMinutes: Object = {};
  min: moment.Moment;
  max: moment.Moment;
  minHour: number;
  minMinute: number;
  maxHour: number;
  maxMinute: number;

  constructor(
    public name: string,
    protected firstOptionValue: number,
    protected lastOptionValue: number,
    min: moment.Moment|string,
    max: moment.Moment|string
  ) {
    super(name, firstOptionValue, lastOptionValue);
    this.min = moment(min);
    this.max = moment(max);
    this.minHour = this.min.hour();
    this.minMinute = this.min.minute();
    this.maxHour = this.max.hour();
    this.maxMinute = this.max.minute();
  }

  filter(hour: number): Array<number> {
    return this.filterLimits(hour).values
  }

  filterLimits(hour: number): MultiPickerColumnMinutes {
    if (!this.existingMinutes[hour]) {
      this.initOptions();
      if (hour < this.minHour || this.maxHour < hour)
        this.existingMinutes[hour] = [];
      else if (!_([this.minHour, this.maxHour]).includes(hour) || this.minMinute == 0 && this.maxMinute == 59)
        this.existingMinutes[hour] = this.values;
      else if (hour == this.minHour && this.minMinute != 0)
        this.existingMinutes[hour] = _.filter(this.values, minute => minute >= this.minMinute);
      else if (hour == this.maxHour && this.maxMinute != 59)
        this.existingMinutes[hour] = _.filter(this.values, minute => minute <= this.maxMinute);
      this.existingMinutes[hour] = super.toOptions(this.existingMinutes[hour]);
    }
    this.options = this.existingMinutes[hour];
    return this
  }

  protected optionText(num: number): string {
    return _.padStart(`${num}`, 2, '0')
  }
}
