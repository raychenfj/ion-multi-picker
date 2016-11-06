import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
	cityColumns: any[];
	fruits: any[];
	fruit: Fruit;
	Fruit;


	constructor(private navCtrl: NavController) {
		// Dependent columns
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
		this.fruits = this.genColumnFromEnum(this.Fruit);
	}

	genColumnFromEnum(enumType: any) {
		let col = [];
		col[0] = { options: [] };

		let keys = Object.keys(enumType);
		let length = keys.length / 2;

		for (let i = 0; i < length; i++) {
			col[0].options.push({
				text: keys[i + length],
				value: keys[i]
			});
		}

		return col;
	}
}
