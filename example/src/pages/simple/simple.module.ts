import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimpleExamplePage } from './simple';

@NgModule({
  declarations: [SimpleExamplePage],
  imports: [IonicPageModule.forChild(SimpleExamplePage)],
  exports: [SimpleExamplePage]
})
export class SimpleExamplePageModule { }