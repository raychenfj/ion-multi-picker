"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var directives_1 = require("./directives");
var ionic_angular_1 = require("ionic-angular");
var MultiPickerModule = (function () {
    function MultiPickerModule() {
    }
    return MultiPickerModule;
}());
MultiPickerModule.decorators = [
    { type: core_1.NgModule, args: [{
                exports: [directives_1.MULTI_PICKER_DIRECTIVES],
                declarations: [directives_1.MULTI_PICKER_DIRECTIVES],
                imports: [
                    ionic_angular_1.IonicModule
                ]
            },] },
];
MultiPickerModule.ctorParameters = function () { return []; };
exports.MultiPickerModule = MultiPickerModule;
//# sourceMappingURL=module.js.map