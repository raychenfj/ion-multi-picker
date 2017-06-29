import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular'

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  simple: any = 'SimpleExamplePage';
  advanced: any = 'AdvancedExamplePage';

  constructor() {

  }
}
