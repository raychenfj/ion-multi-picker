import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import moment from 'moment';

@Component({
	templateUrl: 'advanced.html',
})

export class AdvancedExamplePage {
  private formBuilder: FormBuilder = new FormBuilder();
  formGroup: FormGroup = this.formBuilder.group({
    date: [moment().format()],
    time: [moment().format()],
    minTime: [moment('09:00', 'HH:mm').format()],
    maxTime: [moment('10:40', 'HH:mm').format()]
  });
	constructor(private navCtrl: NavController) {
	}

  filterDays(days: Array<number>, month: number, year: number): number[] {
    return days
  }
}
