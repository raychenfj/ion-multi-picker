import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvancedExamplePage } from './advanced';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [AdvancedExamplePage],
  imports: [
    IonicPageModule.forChild(AdvancedExamplePage),
    MultiPickerModule
  ],
  exports: [AdvancedExamplePage]
})
export class AdvancedExamplePageModule { }