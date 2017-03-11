"use strict";
var core_1 = require('@angular/core');
var directives_1 = require('./directives');
var MultiPickerModule = (function () {
    function MultiPickerModule() {
    }
    MultiPickerModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [directives_1.MULTI_PICKER_DIRECTIVES],
                    declarations: [directives_1.MULTI_PICKER_DIRECTIVES]
                },] },
    ];
    MultiPickerModule.ctorParameters = function () { return []; };
    return MultiPickerModule;
}());
exports.MultiPickerModule = MultiPickerModule;
//# sourceMappingURL=module.js.map