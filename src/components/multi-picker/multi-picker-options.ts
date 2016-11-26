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
