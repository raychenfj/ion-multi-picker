import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
	templateUrl: 'simple.html',
})
export class SimpleExamplePage implements OnInit {
	default: string = '1 1-2 1-2-2';
	simpleColumns: any[];
	independentColumns:any[];
	cityPickerOption: any[];
	datetime;

	constructor(private navCtrl: NavController) {

	}

	ngOnInit() {
		this.simpleColumns = [
			{
				name:'col1',
				options: [{ text: '1', value: '1' },
					{ text: '2', value: '2' },
					{ text: '3', value: '3' }]
			},
			{
				name:'col2',
				options: [{ text: '1-1', value: '1-1'},
					{ text: '1-2', value: '1-2'},
					{ text: '2-1', value: '2-1'},
					{ text: '2-2', value: '2-2'},
					{ text: '3-1', value: '3-1'},]
			},
			{
				name:'col3',
				options: [{ text: '1-1-1', value: '1-1-1'},
					{ text: '1-1-2', value: '1-1-2'},
					{ text: '1-2-1', value: '1-2-1'},
					{ text: '1-2-2', value: '1-2-2'},
					{ text: '2-1-1', value: '2-1-1'},
					{ text: '2-1-2', value: '2-1-2'},
					{ text: '2-2-1', value: '2-2-1'},
					{ text: '2-2-2', value: '2-2-2'},
					{ text: '3-1-1', value: '3-1-1'},
					{ text: '3-1-2', value: '3-1-2'},]
			}
		];
	}
}
