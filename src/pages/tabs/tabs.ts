import { Component } from '@angular/core';

import { SimpleExamplePage } from '../simple/simple';
import { AdvancedExamplePage } from '../advanced/advanced';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  simple:any = SimpleExamplePage;
  advanced:any = AdvancedExamplePage;

  constructor() {

  }
}
