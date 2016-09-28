# Ion-Multi-Picker
Ion Multi Item Picker--An Ionic2 Custom Component

Simulate IOS multi column picker by ionic2 picker.

Github: [https://github.com/raychenfj/ion-multi-picker](https://github.com/raychenfj/ion-multi-picker)

NPM: [https://www.npmjs.com/package/ion-multi-picker](https://www.npmjs.com/package/ion-multi-picker)

## Preview
### Picker with Independent Coulmns

![Picker with Independent Columns](https://lh3.googleusercontent.com/K_qfHAzPjahDn_TcmDfVqYSwI17k21sGiG49TO68DWHMcp_JZgrMh56LTHCKb772iOGbTDdC2gIamZF0XgqhdBffcyslWFVc_tvN6mxvEzsaZHTT170MkXSbaZpi0ma43NNwC-QyzcGzvMIsSITB9l-ydDt0jAzuVpcIg5WUJKYiBnxLyM1u_YyVQr1KXAE3sBFko0rek_drnApnjTA8i7CodR-gjAzdsXzlr9dkvaSDrLmZKhtcmt-6DXO6kXg4h76VwFbssBH4WHPiySt4Us_ATN0ame-zlFnVvrWBeFj950DxyN4ZEbBNv53DpNklAuqFtsniJUHt-5MX_r-9-lGSxal84pdleQlMCt-1vLZVm9dMisWvsC9nLiHDyfPIqAXITUunmh92zi72Ek93NUn_l5xuf9lBWrgV_XnsI3u-BqkawssjFAiB03ikCvXSie-_Mcjc9L2JLx66N_AaV4Lx4qudSt7Y2Hgn4al3xlBbd5TfvxO6CasJuzZYWRDcDIZAi0S0fGwW4wCkkAKPUVyopSF0b_8Nuyas_HpdHNo0KxDXrjphghsGYoErm2_CqbBymF2NZfCWqk9ZfmOGrgFz1bmsFSMrZGc-OH3kCHlRlzU=w490-h245-no)

### Picker with Dependent Columns

![Picker with Dependent Columns](https://lh3.googleusercontent.com/He5I2Z3f46UgDIaFPnGznAr2o8CSpTAZ9LmJwuELIFuts20qqvEJ6TTSkLwVIcb9W2F0Ou10C1EoO_uH22YjOfYabaf4yGrfJv5ymJJYwy1RZGlCvNWHrrs7WpohocT9Pissno-uSfvZO1egxgIFmz7sjQR_tDNBIsMjPJqPFhoLGrmU9nEGXusPF3ZRw_bMZXeS1c42HTvIiko2Pw9kUlkY8rEONRRlEZncIFPYxJblwViwOzM8GV32LRYQN9SXKuO04ux2IL2eseflkz7CVsfJk7hUp0NYCe2PtoJ5GxDAIoWqyl677mjq3d2j4DsYlobKF9loea3KOjUUdJGjcAt4AwHkzJPPbpvcgle4DCfvdZ0N84eZtdSyWcsR2Hz-XozNm_eS5Rhg3dHS1yDzl2XHJE5aGP8yfXbP1hFItY1wZwZIbo8eeVYi3Cpi8ct6FsQvEAvS8hbcoAEEwWN6z1XPq0u_8vV8vMY_IDXoSMU9mOJTE0uuERXjKbcNHeH5MIH09YjumBdrRYJ6-rcNEv4-PPBao-1QuTSfSo40N1VYW4c9SmoA9D39ZfQSRByntJTB0YE8mQtJgJBSq0P9TMMbDISkZDz-YuljUD_WxWsfnfs=w490-h245-no)

### Sample: Chinese City Picker

![Chinese City Picker](https://lh3.googleusercontent.com/en7ivOdQaIpjh6C7T4dVPU1Apgz1cElqoJzQnPkHe4IkvgagQV6MwWMLD07TdMFDsShU002khhY7efaxlzBKL7mE1UHp_FaS_WwKo3dhUCQF9dB57byKc-9-y_f-3KVEJ07DE84itWEtFLcc6c3x-q_XZ45pXIlHGOh1u9TlK_banlEy5xQDKop6eaZrVikUNO4WOMKfuKE18_JZz9CJTWcEndOuZUg4CKkOZeBXLBf0bxAVRCpj6DUlp38WoSphWN7veXN0jJzgZTp3RrlZfED-GV-hhNXkaGnYa6S4LCrmJQkkJ92a0qGGViHgIcDM23udmfyfROGH1SAeuXY7PpLtM7eqoKGXg1V-vmM-CsYLywTaByASALqLuy-dqzNYf9aP4cyqxReB1mODjYaMBAGTLaeDxDNMpUg56i7OEktKNwFRg7-bxXY5VbSX8xtsQT0wqPGySqRRUZwpZB-DY8emlL-VQ9Awr2lZYPURaLbnHxcmAi7DCugv7rBccaeDXkZP1TOGfOU2CZXLKZJIw8XkLQs0bmmPIvIvbYcvi4KcQrkcEMQd9DJkZq7P5vOMWqAYQzpZZSMwTvj6llyAg-wEC_5uE0zKJloNjcQZKfQqCMw=w490-h245-no)

## Demo
Check out the live demo here: [https://raychenfj.github.io/ion-multi-picker/](https://raychenfj.github.io/ion-multi-picker/)

## Install
```
npm install ion-multi-picker --save
```

## Usage
1.Import MultiPicker as directive in your page.
```Typescript
import {MultiPicker} from 'ion-multi-picker';

@Component({
	templateUrl: 'build/pages/home/home.html',
	directives: [MultiPicker],
})
```
2.Initialize picker columns.
```typescript
	constructor(private navCtrl: NavController) {
		this.simpleColumns = [
			{
				name: 'col1',
				options: [{ text: '1', value: '1' },
					{ text: '2', value: '2' },
					{ text: '3', value: '3' }]
			},
			{
				name: 'col2',
				options: [{ text: '1-1', value: '1-1' },
					{ text: '1-2', value: '1-2' },
					{ text: '2-1', value: '2-1' },
					{ text: '2-2', value: '2-2' },
					{ text: '3-1', value: '3-1' },]
			},
			{
				name: 'col3',
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
	}
```
3.Import the corresponding scss at the end of app.core.scss, app.ios.scss, app.md.scss, app.wp.scss.
```
@import "../../node_modules/ion-multi-picker/multi-picker"; //app.core.scss
@import "../../node_modules/ion-multi-picker/multi-picker.ios"; //app.ios.scss
@import "../../node_modules/ion-multi-picker/multi-picker.md"; //app.md.scss
@import "../../node_modules/ion-multi-picker/multi-picker.wp"; //app.wp.scss
```
4.In your html template, add ion-multi-picker like other ionic component.Use [(ngModel)] to bind your data.

**Note: Don't forget the item-content attribute**
```html
    <ion-item>
        <ion-label>Simple Picker</ion-label>
        <ion-multi-picker item-content [multiPickerColumns]="simpleColumns"></ion-multi-picker>
    </ion-item>
```

## Data Structure
* @Input() multiPickerColumns
Array of MultiPickerColumn.

* MultiPickerColumn
	* name: Coulmn name, will be the column index start from 0 by default.
    * options: Options in a column, array of MultiPickerOption.
    
* MultiPickerOption
	* text: The text displayed in the picker column.
    * value: The associated value of the text.
    * parentVal: Specify the dependency between current column and previous column.
    * disabled: The option is displayed or not.

## License
MIT
