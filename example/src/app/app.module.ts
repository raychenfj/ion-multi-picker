import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { SimpleExamplePage } from '../pages/simple/simple';
import { AdvancedExamplePage } from '../pages/advanced/advanced';
import { MultiPickerModule } from 'ion-multi-picker';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    SimpleExamplePage,
    AdvancedExamplePage,
  ],
  imports: [
    BrowserModule,
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
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
