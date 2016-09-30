import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SimpleExamplePage } from '../pages/simple/simple';
import { AdvancedExamplePage } from '../pages/advanced/advanced';
import { MultiPicker } from '../components/multi-picker/multi-picker';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SimpleExamplePage,
    AdvancedExamplePage,
    MultiPicker
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    SimpleExamplePage,
    AdvancedExamplePage,
    MultiPicker
  ],
  providers: []
})
export class AppModule {}
