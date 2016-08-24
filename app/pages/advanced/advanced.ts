import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MultiPicker} from '../../../ion-multi-picker';

@Component({
  templateUrl: 'build/pages/advanced/advanced.html',
  directives: [MultiPicker]
})

export class AdvancedExamplePage {
	default='1 1-2 1-2-2';
	dependentColumns:any[];
	independentColumns:any[];
	cityPickerOption:any[];


  constructor(private navCtrl: NavController) {
  	this.dependentColumns = [
			{
				options: [{ text: '1', value: '1' },
					{ text: '2', value: '2' },
					{ text: '3', value: '3' }]
			},
			{
				options: [{ text: '1-1', value: '1-1', parentVal: '1' },
					{ text: '1-2', value: '1-2', parentVal: '1' },
					{ text: '2-1', value: '2-1', parentVal: '2' },
					{ text: '2-2', value: '2-2', parentVal: '2' },
					{ text: '3-1', value: '3-1', parentVal: '3' },]
			},
			{
				options: [{ text: '1-1-1', value: '1-1-1', parentVal: '1-1' },
					{ text: '1-1-2', value: '1-1-2', parentVal: '1-1' },
					{ text: '1-2-1', value: '1-2-1', parentVal: '1-2' },
					{ text: '1-2-2', value: '1-2-2', parentVal: '1-2' },
					{ text: '2-1-1', value: '2-1-1', parentVal: '2-1' },
					{ text: '2-1-2', value: '2-1-2', parentVal: '2-1' },
					{ text: '2-2-1', value: '2-2-1', parentVal: '2-2' },
					{ text: '2-2-2', value: '2-2-2', parentVal: '2-2' },
					{ text: '3-1-1', value: '3-1-1', parentVal: '3-1' },
					{ text: '3-1-2', value: '3-1-2', parentVal: '3-1' },]
			}
		];

		this.independentColumns = [
			{
				options: [{ text: '1', value: '1' },
					{ text: '2', value: '2' },
					{ text: '3', value: '3' }]
			},
			{
				options: [{ text: '1-1', value: '1-1' },
					{ text: '1-2', value: '1-2' },
					{ text: '2-1', value: '2-1' },
					{ text: '2-2', value: '2-2' },
					{ text: '3-1', value: '3-1' },]
			},
			{
				options: [{ text: '1-1-1', value: '1-1-1' },
					{ text: '1-1-2', value: '1-1-2' },
					{ text: '1-2-1', value: '1-2-1' },
					{ text: '1-2-2', value: '1-2-2' },
					{ text: '2-1-1', value: '2-1-1' },
					{ text: '2-1-2', value: '2-1-2' },
					{ text: '2-2-1', value: '2-2-1' },
					{ text: '2-2-2', value: '2-2-2' },
					{ text: '3-1-1', value: '3-1-1' },
					{ text: '3-1-2', value: '3-1-2' },]
			}
		];

		this.cityPickerOption = [
			// {
			// 	text:'北京市',value:'beijing',options:[
			// 		{text:'海淀区',value:'haidian'},
			// 		{text}
			// 	]
			// }
		];
  }
}
