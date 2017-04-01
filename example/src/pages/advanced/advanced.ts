import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { convertEnumToColumn } from 'ion-multi-picker';
import citise from '../../assets/chinese-cities.json';

enum Fruit {
	Apple, Orange, Melon, Banana, Pear,
}

@Component({
	templateUrl: 'advanced.html',
})

export class AdvancedExamplePage {
	default = '1 1-2 1-2-2';
	dependentColumns: any[];
	independentColumns: any[];
	parentColumns: any[];
	fruits: any[];
	fruit: Fruit;
	Fruit;
	sepVal = '1_1 2_1 2 1';
	sepColumns: any[];
	separator = '_';
	cityColumns: any[];


	constructor(private navCtrl: NavController) {
		// Dependent columns
		this.dependentColumns = [
			{
				columnWidth: '100px',
				options: [
					{ text: '1', value: '1' },
					{ text: '2', value: '2' },
					{ text: '3', value: '3' },
					{ text: '4', value: '4' },
					{ text: '5', value: '5' },
					{ text: '6', value: '6' },
					{ text: '7', value: '7' },
					{ text: '8', value: '8' },
					{ text: '9', value: '9' },
					{ text: '10', value: '10' }],
			},
			{
				columnWidth: '100px',
				options: [
					{ text: '1-1', value: '1-1', parentVal: '1' },
					{ text: '1-2', value: '1-2', parentVal: '1' },
					{ text: '1-3', value: '1-3', parentVal: '1' },
					{ text: '1-4', value: '1-4', parentVal: '1' },

					{ text: '2-1', value: '2-1', parentVal: '2' },
					{ text: '2-2', value: '2-2', parentVal: '2' },
					{ text: '2-3', value: '2-3', parentVal: '2' },
					{ text: '2-4', value: '2-4', parentVal: '2' },

					{ text: '3-1', value: '3-1', parentVal: '3' },
					{ text: '3-2', value: '3-2', parentVal: '3' },
					{ text: '3-3', value: '3-3', parentVal: '3' },
					{ text: '3-4', value: '3-4', parentVal: '3' },

					{ text: '4-1', value: '4-1', parentVal: '4' },
					{ text: '4-2', value: '4-2', parentVal: '4' },
					{ text: '4-3', value: '4-3', parentVal: '4' },
					{ text: '4-4', value: '4-4', parentVal: '4' },

					{ text: '5-1', value: '5-1', parentVal: '5' },
					{ text: '5-2', value: '5-2', parentVal: '5' },
					{ text: '5-3', value: '5-3', parentVal: '5' },
					{ text: '5-4', value: '5-4', parentVal: '5' },

					{ text: '6-1', value: '6-1', parentVal: '6' },
					{ text: '6-2', value: '6-2', parentVal: '6' },
					{ text: '6-3', value: '6-3', parentVal: '6' },
					{ text: '6-4', value: '6-4', parentVal: '6' },

					{ text: '7-1', value: '7-1', parentVal: '7' },
					{ text: '7-2', value: '7-2', parentVal: '7' },
					{ text: '7-3', value: '7-3', parentVal: '7' },
					{ text: '7-4', value: '7-4', parentVal: '7' },

					{ text: '8-1', value: '8-1', parentVal: '8' },
					{ text: '8-2', value: '8-2', parentVal: '8' },
					{ text: '8-3', value: '8-3', parentVal: '8' },
					{ text: '8-4', value: '8-4', parentVal: '8' },

					{ text: '9-1', value: '9-1', parentVal: '9' },
					{ text: '9-2', value: '9-2', parentVal: '9' },
					{ text: '9-3', value: '9-3', parentVal: '9' },
					{ text: '9-4', value: '9-4', parentVal: '9' },

					{ text: '10-1', value: '10-1', parentVal: '10' },
					{ text: '10-2', value: '10-2', parentVal: '10' },
					{ text: '10-3', value: '10-3', parentVal: '10' },
					{ text: '10-4', value: '10-4', parentVal: '10' }],
			},
			{
				columnWidth: '100px',
				options: [
					{ text: '1-1-1', value: '1-1-1', parentVal: '1-1' },
					{ text: '1-1-2', value: '1-1-2', parentVal: '1-1' },
					{ text: '1-1-3', value: '1-1-3', parentVal: '1-1' },
					{ text: '1-1-4', value: '1-1-4', parentVal: '1-1' },
					{ text: '1-2-1', value: '1-2-1', parentVal: '1-2' },
					{ text: '1-2-2', value: '1-2-2', parentVal: '1-2' },
					{ text: '1-2-3', value: '1-2-3', parentVal: '1-2' },
					{ text: '1-2-4', value: '1-2-4', parentVal: '1-2' },
					{ text: '1-3-1', value: '1-3-1', parentVal: '1-3' },
					{ text: '1-3-2', value: '1-3-2', parentVal: '1-3' },
					{ text: '1-3-3', value: '1-3-3', parentVal: '1-3' },
					{ text: '1-3-4', value: '1-3-4', parentVal: '1-3' },
					{ text: '1-4-1', value: '1-4-1', parentVal: '1-4' },
					{ text: '1-4-2', value: '1-4-2', parentVal: '1-4' },
					{ text: '1-4-3', value: '1-4-3', parentVal: '1-4' },
					{ text: '1-4-4', value: '1-4-4', parentVal: '1-4' },

					{ text: '2-1-1', value: '2-1-1', parentVal: '2-1' },
					{ text: '2-1-2', value: '2-1-2', parentVal: '2-1' },
					{ text: '2-1-3', value: '2-1-3', parentVal: '2-1' },
					{ text: '2-1-4', value: '2-1-4', parentVal: '2-1' },
					{ text: '2-2-1', value: '2-2-1', parentVal: '2-2' },
					{ text: '2-2-2', value: '2-2-2', parentVal: '2-2' },
					{ text: '2-2-3', value: '2-2-3', parentVal: '2-2' },
					{ text: '2-2-4', value: '2-2-4', parentVal: '2-2' },
					{ text: '2-3-1', value: '2-3-1', parentVal: '2-3' },
					{ text: '2-3-2', value: '2-3-2', parentVal: '2-3' },
					{ text: '2-3-3', value: '2-3-3', parentVal: '2-3' },
					{ text: '2-3-4', value: '2-3-4', parentVal: '2-3' },
					{ text: '2-4-1', value: '2-4-1', parentVal: '2-4' },
					{ text: '2-4-2', value: '2-4-2', parentVal: '2-4' },
					{ text: '2-4-3', value: '2-4-3', parentVal: '2-4' },
					{ text: '2-4-4', value: '2-4-4', parentVal: '2-4' },

					{ text: '3-1-1', value: '3-1-1', parentVal: '3-1' },
					{ text: '3-1-2', value: '3-1-2', parentVal: '3-1' },
					{ text: '3-1-3', value: '3-1-3', parentVal: '3-1' },
					{ text: '3-1-4', value: '3-1-4', parentVal: '3-1' },
					{ text: '3-2-1', value: '3-2-1', parentVal: '3-2' },
					{ text: '3-2-2', value: '3-2-2', parentVal: '3-2' },
					{ text: '3-2-3', value: '3-2-3', parentVal: '3-2' },
					{ text: '3-2-4', value: '3-2-4', parentVal: '3-2' },
					{ text: '3-3-1', value: '3-3-1', parentVal: '3-3' },
					{ text: '3-3-2', value: '3-3-2', parentVal: '3-3' },
					{ text: '3-3-3', value: '3-3-3', parentVal: '3-3' },
					{ text: '3-3-4', value: '3-3-4', parentVal: '3-3' },
					{ text: '3-4-1', value: '3-4-1', parentVal: '3-4' },
					{ text: '3-4-2', value: '3-4-2', parentVal: '3-4' },
					{ text: '3-4-3', value: '3-4-3', parentVal: '3-4' },
					{ text: '3-4-4', value: '3-4-4', parentVal: '3-4' },

					{ text: '4-1-1', value: '4-1-1', parentVal: '4-1' },
					{ text: '4-1-2', value: '4-1-2', parentVal: '4-1' },
					{ text: '4-1-3', value: '4-1-3', parentVal: '4-1' },
					{ text: '4-1-4', value: '4-1-4', parentVal: '4-1' },
					{ text: '4-2-1', value: '4-2-1', parentVal: '4-2' },
					{ text: '4-2-2', value: '4-2-2', parentVal: '4-2' },
					{ text: '4-2-3', value: '4-2-3', parentVal: '4-2' },
					{ text: '4-2-4', value: '4-2-4', parentVal: '4-2' },
					{ text: '4-3-1', value: '4-3-1', parentVal: '4-3' },
					{ text: '4-3-2', value: '4-3-2', parentVal: '4-3' },
					{ text: '4-3-3', value: '4-3-3', parentVal: '4-3' },
					{ text: '4-3-4', value: '4-3-4', parentVal: '4-3' },
					{ text: '4-4-1', value: '4-4-1', parentVal: '4-4' },
					{ text: '4-4-2', value: '4-4-2', parentVal: '4-4' },
					{ text: '4-4-3', value: '4-4-3', parentVal: '4-4' },
					{ text: '4-4-4', value: '4-4-4', parentVal: '4-4' },

					{ text: '5-1-1', value: '5-1-1', parentVal: '5-1' },
					{ text: '5-1-2', value: '5-1-2', parentVal: '5-1' },
					{ text: '5-1-3', value: '5-1-3', parentVal: '5-1' },
					{ text: '5-1-4', value: '5-1-4', parentVal: '5-1' },
					{ text: '5-2-1', value: '5-2-1', parentVal: '5-2' },
					{ text: '5-2-2', value: '5-2-2', parentVal: '5-2' },
					{ text: '5-2-3', value: '5-2-3', parentVal: '5-2' },
					{ text: '5-2-4', value: '5-2-4', parentVal: '5-2' },
					{ text: '5-3-1', value: '5-3-1', parentVal: '5-3' },
					{ text: '5-3-2', value: '5-3-2', parentVal: '5-3' },
					{ text: '5-3-3', value: '5-3-3', parentVal: '5-3' },
					{ text: '5-3-4', value: '5-3-4', parentVal: '5-3' },
					{ text: '5-4-1', value: '5-4-1', parentVal: '5-4' },
					{ text: '5-4-2', value: '5-4-2', parentVal: '5-4' },
					{ text: '5-4-3', value: '5-4-3', parentVal: '5-4' },
					{ text: '5-4-4', value: '5-4-4', parentVal: '5-4' },

					{ text: '6-1-1', value: '6-1-1', parentVal: '6-1' },
					{ text: '6-1-2', value: '6-1-2', parentVal: '6-1' },
					{ text: '6-1-3', value: '6-1-3', parentVal: '6-1' },
					{ text: '6-1-4', value: '6-1-4', parentVal: '6-1' },
					{ text: '6-2-1', value: '6-2-1', parentVal: '6-2' },
					{ text: '6-2-2', value: '6-2-2', parentVal: '6-2' },
					{ text: '6-2-3', value: '6-2-3', parentVal: '6-2' },
					{ text: '6-2-4', value: '6-2-4', parentVal: '6-2' },
					{ text: '6-3-1', value: '6-3-1', parentVal: '6-3' },
					{ text: '6-3-2', value: '6-3-2', parentVal: '6-3' },
					{ text: '6-3-3', value: '6-3-3', parentVal: '6-3' },
					{ text: '6-3-4', value: '6-3-4', parentVal: '6-3' },
					{ text: '6-4-1', value: '6-4-1', parentVal: '6-4' },
					{ text: '6-4-2', value: '6-4-2', parentVal: '6-4' },
					{ text: '6-4-3', value: '6-4-3', parentVal: '6-4' },
					{ text: '6-4-4', value: '6-4-4', parentVal: '6-4' },

					{ text: '7-1-1', value: '7-1-1', parentVal: '7-1' },
					{ text: '7-1-2', value: '7-1-2', parentVal: '7-1' },
					{ text: '7-1-3', value: '7-1-3', parentVal: '7-1' },
					{ text: '7-1-4', value: '7-1-4', parentVal: '7-1' },
					{ text: '7-2-1', value: '7-2-1', parentVal: '7-2' },
					{ text: '7-2-2', value: '7-2-2', parentVal: '7-2' },
					{ text: '7-2-3', value: '7-2-3', parentVal: '7-2' },
					{ text: '7-2-4', value: '7-2-4', parentVal: '7-2' },
					{ text: '7-3-1', value: '7-3-1', parentVal: '7-3' },
					{ text: '7-3-2', value: '7-3-2', parentVal: '7-3' },
					{ text: '7-3-3', value: '7-3-3', parentVal: '7-3' },
					{ text: '7-3-4', value: '7-3-4', parentVal: '7-3' },
					{ text: '7-4-1', value: '7-4-1', parentVal: '7-4' },
					{ text: '7-4-2', value: '7-4-2', parentVal: '7-4' },
					{ text: '7-4-3', value: '7-4-3', parentVal: '7-4' },
					{ text: '7-4-4', value: '7-4-4', parentVal: '7-4' },

					{ text: '8-1-1', value: '8-1-1', parentVal: '8-1' },
					{ text: '8-1-2', value: '8-1-2', parentVal: '8-1' },
					{ text: '8-1-3', value: '8-1-3', parentVal: '8-1' },
					{ text: '8-1-4', value: '8-1-4', parentVal: '8-1' },
					{ text: '8-2-1', value: '8-2-1', parentVal: '8-2' },
					{ text: '8-2-2', value: '8-2-2', parentVal: '8-2' },
					{ text: '8-2-3', value: '8-2-3', parentVal: '8-2' },
					{ text: '8-2-4', value: '8-2-4', parentVal: '8-2' },
					{ text: '8-3-1', value: '8-3-1', parentVal: '8-3' },
					{ text: '8-3-2', value: '8-3-2', parentVal: '8-3' },
					{ text: '8-3-3', value: '8-3-3', parentVal: '8-3' },
					{ text: '8-3-4', value: '8-3-4', parentVal: '8-3' },
					{ text: '8-4-1', value: '8-4-1', parentVal: '8-4' },
					{ text: '8-4-2', value: '8-4-2', parentVal: '8-4' },
					{ text: '8-4-3', value: '8-4-3', parentVal: '8-4' },
					{ text: '8-4-4', value: '8-4-4', parentVal: '8-4' },

					{ text: '9-1-1', value: '9-1-1', parentVal: '9-1' },
					{ text: '9-1-2', value: '9-1-2', parentVal: '9-1' },
					{ text: '9-1-3', value: '9-1-3', parentVal: '9-1' },
					{ text: '9-1-4', value: '9-1-4', parentVal: '9-1' },
					{ text: '9-2-1', value: '9-2-1', parentVal: '9-2' },
					{ text: '9-2-2', value: '9-2-2', parentVal: '9-2' },
					{ text: '9-2-3', value: '9-2-3', parentVal: '9-2' },
					{ text: '9-2-4', value: '9-2-4', parentVal: '9-2' },
					{ text: '9-3-1', value: '9-3-1', parentVal: '9-3' },
					{ text: '9-3-2', value: '9-3-2', parentVal: '9-3' },
					{ text: '9-3-3', value: '9-3-3', parentVal: '9-3' },
					{ text: '9-3-4', value: '9-3-4', parentVal: '9-3' },
					{ text: '9-4-1', value: '9-4-1', parentVal: '9-4' },
					{ text: '9-4-2', value: '9-4-2', parentVal: '9-4' },
					{ text: '9-4-3', value: '9-4-3', parentVal: '9-4' },
					{ text: '9-4-4', value: '9-4-4', parentVal: '9-4' },

					{ text: '10-1-1', value: '10-1-1', parentVal: '10-1' },
					{ text: '10-1-2', value: '10-1-2', parentVal: '10-1' },
					{ text: '10-1-3', value: '10-1-3', parentVal: '10-1' },
					{ text: '10-1-4', value: '10-1-4', parentVal: '10-1' },
					{ text: '10-2-1', value: '10-2-1', parentVal: '10-2' },
					{ text: '10-2-2', value: '10-2-2', parentVal: '10-2' },
					{ text: '10-2-3', value: '10-2-3', parentVal: '10-2' },
					{ text: '10-2-4', value: '10-2-4', parentVal: '10-2' },
					{ text: '10-3-1', value: '10-3-1', parentVal: '10-3' },
					{ text: '10-3-2', value: '10-3-2', parentVal: '10-3' },
					{ text: '10-3-3', value: '10-3-3', parentVal: '10-3' },
					{ text: '10-3-4', value: '10-3-4', parentVal: '10-3' },
					{ text: '10-4-1', value: '10-4-1', parentVal: '10-4' },
					{ text: '10-4-2', value: '10-4-2', parentVal: '10-4' },
					{ text: '10-4-3', value: '10-4-3', parentVal: '10-4' },
					{ text: '10-4-4', value: '10-4-4', parentVal: '10-4' }]
			}
		];

		// Independent columns
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

		// Using enum
		this.fruit = Fruit.Melon;
		this.Fruit = Fruit;
		this.fruits = convertEnumToColumn(this.Fruit);

		// Using parentCol
		this.parentColumns = [
			{
				name: 'child',
				parentCol: 'parent',
				options: [
					{ text: '1-1-1', value: '1-1-1', parentVal: '1-1' },
					{ text: '1-1-2', value: '1-1-2', parentVal: '1-1' },
					{ text: '1-2-1', value: '1-2-1', parentVal: '1-2' },
					{ text: '1-2-2', value: '1-2-2', parentVal: '1-2' },
					{ text: '2-1-1', value: '2-1-1', parentVal: '2-1' },
					{ text: '2-1-2', value: '2-1-2', parentVal: '2-1' },
					{ text: '2-2-1', value: '2-2-1', parentVal: '2-2' },
					{ text: '2-2-2', value: '2-2-2', parentVal: '2-2' }
				]
			},
			{
				name: 'parent',
				parentCol: 'ancestor',
				options: [
					{ text: '1-1', value: '1-1', parentVal: '1' },
					{ text: '1-2', value: '1-2', parentVal: '1' },
					{ text: '2-1', value: '2-1', parentVal: '2' },
					{ text: '2-2', value: '2-2', parentVal: '2' },
				]
			},
			{
				name: 'ancestor',
				options: [
					{ text: '1', value: '1' },
					{ text: '2', value: '2' }
				]
			}
		];

		// Using custom separator and the value contains space 
		this.sepColumns = [
			{
				options: [{ text: '1', value: '1' },
				{ text: '2', value: '2' },
				{ text: '3', value: '3' }]
			},
			{
				options: [{ text: '1-1', value: '1 1' },
				{ text: '1-2', value: '1 2' },
				{ text: '2-1', value: '2 1' },
				{ text: '2-2', value: '2 2' },
				{ text: '3-1', value: '3 1' },]
			},
			{
				options: [{ text: '1-1-1', value: '1 1 1' },
				{ text: '1-1-2', value: '1 1 2' },
				{ text: '1-2-1', value: '1 2 1' },
				{ text: '1-2-2', value: '1 2 2' },
				{ text: '2-1-1', value: '2 1 1' },
				{ text: '2-1-2', value: '2 1 2' },
				{ text: '2-2-1', value: '2 2 1' },
				{ text: '2-2-2', value: '2 2 2' },
				{ text: '3-1-1', value: '3 1 1' },
				{ text: '3-1-2', value: '3 1 2' },]
			}
		];

		// city columns
		this.cityColumns = citise
	}
}
