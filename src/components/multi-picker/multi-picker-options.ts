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
  static momentMap = { day: 'date', month: 'month', year: 'year' };

  constructor(
    public name: string,
    protected firstOptionValue: number,
    protected lastOptionValue: number
  ) {
    this.initOptions();
  }

  get momentName() {
    return MultiPickerColumn.momentMap[this.name]
  }

  get values(): number[] {
    return _.map(this.options, option => parseInt(option.value))
  }

  protected initOptions(): void {
    if (!this.baseOptions) this.baseOptions = this.range(this.firstOptionValue, this.lastOptionValue);
    this.options = _.clone(this.baseOptions);
  }

  protected range(from:number, to:number): Array<IMultiPickerOption> {
    return this.toOptions(_.range(from, to + 1))
  }

  protected toOption(num: number, extend?: Object): IMultiPickerOption  {
    return _.extend({ text: `${num}`, value: num }, extend || {})
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
    this.initOptions();
    let lastMonthDay = super.toMoment(year, month, 1).endOf('month').date();
    let days = this.values;
    this.options = super.toOptions(_.filter(days, day => day <= lastMonthDay));
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
