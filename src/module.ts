import { NgModule } from '@angular/core';
import { MULTI_PICKER_DIRECTIVES } from './directives';
import { IonicModule } from 'ionic-angular';

@NgModule({
    exports: [MULTI_PICKER_DIRECTIVES],
    declarations: [MULTI_PICKER_DIRECTIVES],
    imports: [
        IonicModule
    ]
})
export class MultiPickerModule {

} 