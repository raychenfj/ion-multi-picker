import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import _ from 'lodash';

@Component({
	templateUrl: 'simple.html',
})
export class SimpleExamplePage implements OnInit {
	simpleColumns: any[];
	independentColumns: any[];

	constructor(private navCtrl: NavController) {
	}

	ngOnInit() {
	}

  filterDays(days: Array<number>, month: number, year: number): number[] {
    return _.filter(days, day => day > 15)
  }
}
