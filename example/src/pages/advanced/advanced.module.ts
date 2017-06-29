import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvancedExamplePage } from './advanced';

@NgModule({
  declarations: [AdvancedExamplePage],
  imports: [IonicPageModule.forChild(AdvancedExamplePage)],
  exports: [AdvancedExamplePage]
})
export class AdvancedExamplePageModule { }