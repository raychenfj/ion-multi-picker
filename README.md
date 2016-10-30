# Ion-Multi-Picker 


[![Dependency Status](https://david-dm.org/raychenfj/ion-multi-picker.svg)](https://david-dm.org/raychenfj/ion-multi-picker) [![devDependencies Status](https://david-dm.org/raychenfj/ion-multi-picker/dev-status.svg)](https://david-dm.org/raychenfj/ion-multi-picker?type=dev)


Ion Multi Item Picker--An Ionic2 Custom Picker Component

Simulate IOS multi column picker by ionic2 picker.

Github: [https://github.com/raychenfj/ion-multi-picker](https://github.com/raychenfj/ion-multi-picker)

NPM: [https://www.npmjs.com/package/ion-multi-picker](https://www.npmjs.com/package/ion-multi-picker)

## Preview
### Picker with Independent/ Dependent Columns

![Picker with Independent Columns](https://raw.githubusercontent.com/raychenfj/ion-multi-picker/master/img/independent.png)

![Picker with Dependent Columns](https://raw.githubusercontent.com/raychenfj/ion-multi-picker/master/img/dependent.png)

## Demo
Check out the live demo here: [https://raychenfj.github.io/ion-multi-picker/](https://raychenfj.github.io/ion-multi-picker/)

## Supported Version

Ionic2 2.0.0-rc.0

Ionic CLI 2.1.0


## Installation
```
npm install ion-multi-picker --save
```

## Usage
1.Import MultiPickerModule to your app/module.
```Typescript
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MultiPickerModule //Import MultiPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  providers: []
})
export class AppModule {}
```
2.Initialize picker columns in your controller.
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
You can use `parentVal` property to create dependency between each column.
```typescript
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
		}];
```
3.Add ion-multi-picker to your html template. 

```html
    <ion-item>
        <ion-label>Simple Picker</ion-label>
        <ion-multi-picker item-content [multiPickerColumns]="simpleColumns"></ion-multi-picker>
    </ion-item>
```
**Note: Don't miss the `item-content` attribute**

Like other ionic components, you can use `(ngModel)]` to bind your data.

```html
	<ion-item>
        <ion-label>Default Value</ion-label>
        <ion-multi-picker id="default" [(ngModel)] = "default" item-content [multiPickerColumns]="dependentColumns"></ion-multi-picker>
    </ion-item>
```

Set `disabled` to `true` to prevent interaction.

```html
    <ion-item>
        <ion-label>Disabled Picker</ion-label>
        <ion-multi-picker item-content [multiPickerColumns]="dependentColumns" [disabled]="true"></ion-multi-picker>
    </ion-item>
```


## Attributes
| Attribute | Description | Type | Options | Default|
|-----------|-------------|------|---------|--------|
|multiPickerColumns| **Required**, configure multi picker columns | Array of  MultiPickerColumn| - | - |
|item-content|**Required**, add this attribute so that this custom component can be display correctly under `ion-item` tag| - | - | - |

## Types

* **MultiPickerColumn**

| Property | Description | Type | Options | Default|
|-----------|-------------|------|---------|--------|
|options| **Required**, Options in a column | Array of MultiPickerOption | - | - |
|name| Optional, Column name | String | - | index start from 0 |

* **MultiPickerOption**

| Property | Description | Type | Options | Default|
|-----------|-------------|------|---------|--------|
|text| **Required**, text displayed in the picker column|String|-|-|
|value|**Required**, the associated value of the text|String|-|-|
|parentVal|Optional, specify the dependency between current column and previous column|String|Value from your previos column|-|
|disabled|Optional, the option is visible or not| Boolean|-| false|


## Contribution

Welcome issue report, PR and contributors. Help me improve it.

Ionic2 is a cross-platform framework, 
currently I have quite limited resource to test this custom component.

## License
MIT
