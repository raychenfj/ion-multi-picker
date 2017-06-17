import { NgModule } from '@angular/core';
import { MULTI_PICKER_DIRECTIVES } from './directives';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    exports: [MULTI_PICKER_DIRECTIVES],
    declarations: [MULTI_PICKER_DIRECTIVES],
    imports: [
        BrowserModule
    ]
})
export class MultiPickerModule {

} 