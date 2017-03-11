import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SimpleExamplePage } from '../pages/simple/simple';
import { AdvancedExamplePage } from '../pages/advanced/advanced';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SimpleExamplePage,
    AdvancedExamplePage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MultiPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SimpleExamplePage,
    AdvancedExamplePage,
  ],
  providers: []
})
export class AppModule { }
