import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleExamplePage } from './simple';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [SimpleExamplePage],
  imports: [
    IonicPageModule.forChild(SimpleExamplePage),
    MultiPickerModule
  ],
  exports: [SimpleExamplePage]
})
export class SimpleExamplePageModule { }