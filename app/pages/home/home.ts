import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MultiPicker} from '../../../src/components/multi-picker/multi-picker';

@Component({
	templateUrl: 'build/pages/home/home.html',
	directives: [MultiPicker],
})
export class HomePage implements OnInit {
	pickerValue: string='';
	multiPickerOptions: any[];

	constructor(private navCtrl: NavController) {

	}

	ngOnInit() {
		this.multiPickerOptions = [{
			text: '1', value: '1', options: [
				{ text: '1-1', value: '1-1', options: [{ text: '1-1-1', value: '1-1-1' }, { text: '1-1-2', value: '1-1-2' }] },
				{ text: '1-2', value: '1-2', options: [{ text: '1-2-1', value: '1-2-1' }, { text: '1-2-2', value: '1-2-2' }] }]
			},
			{
				text: '2', value: '2', options: [
					{ text: '2-1', value: '2-1', options: [{ text: '2-1-1', value: '2-1-1' }, { text: '2-1-2', value: '2-1-2' }] },
					{ text: '2-2', value: '2-2', options: [{ text: '2-2-1', value: '2-2-1' }, { text: '2-2-2', value: '2-2-2' }] },
					{ text: '2-3', value: '2-3', options: [{ text: '2-3-1', value: '2-3-1' }, { text: '2-3-2', value: '2-3-2' }] }]
			}];
	}
}
