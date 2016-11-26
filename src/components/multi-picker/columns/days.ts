import _ from 'lodash';

import { MultiPickerColumn, IMultiPickerColumn } from '../multi-picker-options';

export class MultiPickerColumnDays extends MultiPickerColumn implements IMultiPickerColumn {
  weekends: Array<number>;
  customFilterDays: Function;
  existingDates: Object = {};

  constructor(
    public name: string,
    protected firstOptionValue: number,
    protected lastOptionValue: number,
    customFilterDays: Function,
    weekends: string|Array<string|number>
  ) {
    super(name, firstOptionValue, lastOptionValue);
    this.customFilterDays = (month: number, year: number): MultiPickerColumnDays => {
      let days = this.values;
      this.options = super.toOptions((customFilterDays || _.identity)(days, month, year));
      return this
    };

    if (typeof(weekends) == 'string')
      this.weekends = _.split(<string>weekends, /[\,\s]/g).map(weekend => parseInt(weekend));
    else if (weekends instanceof Array)
      this.weekends = _.map(weekends, weekend => parseInt(<string>weekend));
    else
      this.weekends = []
  }

  filter(month: number, year: number): Array<number> {
    return this.filterDays(month, year).filterWeekends(month, year).customFilterDays(month, year).values
  }

  filterDays(month: number, year: number): MultiPickerColumnDays {
    if (!this.existingDates[year] || ! this.existingDates[year][month]) {
      this.initOptions();
      let lastMonthDay = super.toMoment(year, month, 1).endOf('month').date();
      let days = this.values;
      this.existingDates[year] = this.existingDates[year] || {};
      this.existingDates[year][month] = super.toOptions(_.filter(days, day => day <= lastMonthDay));
    }
    this.options = this.existingDates[year][month];
    return this
  }

  filterWeekends(month: number, year: number): MultiPickerColumnDays {
    let days = this.values;
    if (!_.isEmpty(this.weekends))
      this.options = super.toOptions(_.filter(days, day => {
        return !_.includes(this.weekends, super.toMoment(year, month, day).weekday())
      }));
    return this
  }
}
