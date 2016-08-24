# Ion-Multi-Picker
Ion Multi Item Picker--An Ionic2 Custom Component

Simulate IOS multi column picker by ionic2 picker. There could be dependency between each column.

**Note:Still in early stage**
## Demo
Check out the live demo here: [https://raychenfj.github.io/ion-multi-picker/](https://raychenfj.github.io/ion-multi-picker/)

### Quick Start
### ionic2 version
Currently, this component is based on Ionic2-beta11.
### angular2 version
ionic2-beta11 is based on auglar rc4, rc5 is not compatible at this point.
## Simple Examples

```TypeScript
import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MultiPicker} from '../../../ion-multi-picker';

@Component({
	templateUrl: 'build/pages/simple/simple.html',
	directives: [MultiPicker],
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
```

## Build
```
ionic serve //start the demo
```

## License
MIT
