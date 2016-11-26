import _ from 'lodash';
import moment from 'moment';

export interface IMultiPickerOption {
  text?: string
  value?: any;
  parentVal?: any | Array<any>;
  disabled?:boolean;
}

export interface IMultiPickerColumn {
  options: IMultiPickerOption[]
}

export class MultiPickerColumn implements IMultiPickerColumn {
  options: Array<IMultiPickerOption>;
  protected baseOptions: Array<IMultiPickerOption>;
  static momentMap = { day: 'date' };

  constructor(
    public name: string,
    protected firstOptionValue: number,
    protected lastOptionValue: number
  ) {
    this.initOptions();
  }

  get momentName() {
    return MultiPickerColumn.momentMap[this.name] || this.name
  }

  get values(): number[] {
    return _.map(this.options, option => parseInt(option.value))
  }

  protected initOptions(): void {
    this.options = this.range(this.firstOptionValue, this.lastOptionValue);
  }

  protected range(from:number, to:number): Array<IMultiPickerOption> {
    return this.toOptions(_.range(from, to + 1))
  }

  protected optionText(num: number): string {
    return `${num}`
  }

  protected toOption(num: number, extend?: Object): IMultiPickerOption  {
    return _.extend({ text: this.optionText(num), value: num }, extend || {})
  };

  protected toOptions(nums: Array<number>): Array<IMultiPickerOption>  {
    return nums.map(val => { return this.toOption(val) })
  };

  protected toMoment(year, month, day): moment.Moment {
    return moment([year, month - 1, day])
  }
}

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

export class MultiPickerColumnHours extends MultiPickerColumn implements IMultiPickerColumn {
  protected optionText(num: number): string {
    return _.padStart(`${num}`, 2, '0')
  }
}
