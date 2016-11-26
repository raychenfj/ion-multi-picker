import _ from 'lodash';

import { MultiPickerColumn, IMultiPickerColumn } from '../multi-picker-columns'

export class MultiPickerColumnHours extends MultiPickerColumn implements IMultiPickerColumn {
  protected optionText(num: number): string {
    return _.padStart(`${num}`, 2, '0')
  }
}
