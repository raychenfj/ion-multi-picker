import {Component} from '@angular/core';
import {SimpleExamplePage} from '../simple/simple';
import {AdvancedExamplePage} from '../advanced/advanced';
@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = SimpleExamplePage;
    this.tab2Root = AdvancedExamplePage;
  }
}
