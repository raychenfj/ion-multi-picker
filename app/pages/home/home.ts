import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MultiPicker} from '../../../src/components/multi-picker/multi-picker';

@Component({
	templateUrl: 'build/pages/home/home.html',
	directives: [MultiPicker],
})
export class HomePage {
	pickerValue: String;

	constructor(private navCtrl: NavController) {

	}
}
