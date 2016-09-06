# Ion-Multi-Picker
Ion Multi Item Picker--An Ionic2 Custom Component

Simulate IOS multi column picker by ionic2 picker.

Github: [https://github.com/raychenfj/ion-multi-picker](https://github.com/raychenfj/ion-multi-picker)

NPM: [https://www.npmjs.com/package/ion-multi-picker](https://www.npmjs.com/package/ion-multi-picker)

## Preview
### Picker with Independent Coulmns

![Picker with Independent Columns](https://lh3.googleusercontent.com/kd8sW24oBJGtKGGZU4obzLtQ6Ieq7M4rpftTVyJ6jTll8DpW99UdxczredQJM4XxTZwm-zPbZCzPfoysXTIo2OR4mnKKtO99A3jZONdvMCJtM0epxWv6uxT1LDS6TNbV5Fq7abLR5eaBIxH0xL37CLDBGCF1Xg9fCbGkQnyw1NzOGPWuS8pC9Gqktpmj_g-BZoXlQv7gvMHHPD5wHLr2XA7etHBE_AHd66vs4YARukXoCOlVZj1e4Y2V15jNay9Zh6axHLtCsewV4RzIwP_7IcZc8wQt6w3KVm6k6KOs5v3izwcPB4-hvUPv4E5H7hgCUE0uaqGGxAvs4p5VlmAKcnHE735N82oDem2DbBrQR559uigYdyhARy1S5zs_yXL4V-3DVRAIPmJTIvD-TTEJ2wP6F0kwsjua3nJ9QF_22RsOhHOVC_lrAsh0aHQy-sg5lKoio1D-QjqVrvE04so_M9woZgbLVf9-jYQFA4T5gDPKZop0TGDUUDlcYNlsAYTawqj5pu4_nlgz-ZjegQcbLMxfi_sHPBStFE2bvR-8dqv8syprzbQmOLoKaM-KB7keMn7Pu-X3RH57YQ-7c20GyYOIP-KTIzzm1EnSAca76GQ9JDs=w490-h245-no)

### Picker with Dependent Columns

![Picker with Dependent Columns](https://lh3.googleusercontent.com/N5GssdmlPK7H-gFC7w-E_RzMdTGgwbW-A8WjatykOPokmMD8PfHO6dAD6cKENfXH_iFJ2r9XX-I9cwrtxbyz9y0rwo2W1XbzpiSoACZcXHTTtDjw9kjqxFwzHD46iA_0th0svObuOQ7V6TAbLbfbW9p0MQRVDmhOWHDNq6DiysBk0ABmEEhN7dx8G8H7G53MBoRQk-ym9uaFhXAUGUUdytbO0JEUKNzBHrgccUsL2pZBbJwcgjrGcmNNhf2x1N8tdojQCDc_vaZ4_Io7uCkwPfTRo8CZ8mhUUIZwzgoeHaqxJqbuK43q7wNb0gLuNW_ZFWiDk-newDEUNQWJWY2lnq-hKSvRGh_GoCdnvZQYNgUI1aqv48B5LOyvELI0490Ez34UTI1l-osFH8J5o5jQnuCRwVcxkT2Kv4YPUEpZ-o1jf_3FST6m06GlmZ4dcaOpCgwtmUm42hzNy8y9QtsAMZl2y07kqz-wwVpY5-LRuprQOIkwco7kMEnbxDBLdxNCuJb88Em3t-CIiEQ-JQdWehm3D2tpAwtYT0VF_Tco9oH8KqJLa-_ttus7tVdDj3IA8PCrosK1_0tbAI4XwIPR9MntHY2Jgp9UWY_ulFt1RALRsNI=w490-h245-no)

### Sample: Chinese City Picker

![Chinese City Picker](https://lh3.googleusercontent.com/zONayALEjO2E7Pl8x-oE3Xthl0yM-cPyvQMl1AXuylFYpcRsNI1Uy6Y6JqDrXNajwjUfIet1eRx4vIMnWAWkfTh2fRF5YQ2yKBwDTdyXz_JAWJqYJVbw-l5ZFumaxI7CzH07ohEFb-b7Mrw4PGnNAKGOBhLxnA_GA7ISgVckRSk_TW2e1gXkMbJGepdWkYZ7boGwS3T9ZS8hbgSHaT1jGWU8p_PuG9RwzEF8_P-qg0QrIS1L-a-Ogb-1Ny3KWWVvSQCNpy4N-aGpSJpI0ktoB2zcXAlD5aQ6NpORq5qba4D73qJIPBB1w6Re1FmkoCsgCH6pAUxE0nl2Srjr7qIAmidJoEcbYCWut6kR-gURvH1riyRxWTolnHdFr_PLyp-qmEDkTJx7RGydyGrPL47nMrgWSMaEjAb0wdiI3t4F3N6-bSJV_z4W1qKIgrQi_HChGXq6sk3vOlfv8hN1tiifIuOX4mSlxBHnjTJURSLcHEow_zy0c2_80IgKPjpKuLjf_JH_nYzcdgkBTH8bOmKKbLm_u5zdT2VtLn3-8lq2ZFHPQysnlgKX6kmVAa_JxWbgtP0A5TPi4rziiKxlw37rxz0DoMW6-puqjsX_TghuAy6DI68=w490-h245-no)

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
