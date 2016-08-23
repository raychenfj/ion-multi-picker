"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ion_multi_picker_1 = require('../../../ion-multi-picker');
var HomePage = (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.default = '1 1-2 1-2-2';
    }
    HomePage.prototype.ngOnInit = function () {
        this.dependentColumns = [
            {
                options: [{ text: '1', value: '1' },
                    { text: '2', value: '2' },
                    { text: '3', value: '3' }]
            },
            {
                options: [{ text: '1-1', value: '1-1', parentVal: '1' },
                    { text: '1-2', value: '1-2', parentVal: '1' },
                    { text: '2-1', value: '2-1', parentVal: '2' },
                    { text: '2-2', value: '2-2', parentVal: '2' },
                    { text: '3-1', value: '3-1', parentVal: '3' },]
            },
            {
                options: [{ text: '1-1-1', value: '1-1-1', parentVal: '1-1' },
                    { text: '1-1-2', value: '1-1-2', parentVal: '1-1' },
                    { text: '1-2-1', value: '1-2-1', parentVal: '1-2' },
                    { text: '1-2-2', value: '1-2-2', parentVal: '1-2' },
                    { text: '2-1-1', value: '2-1-1', parentVal: '2-1' },
                    { text: '2-1-2', value: '2-1-2', parentVal: '2-1' },
                    { text: '2-2-1', value: '2-2-1', parentVal: '2-2' },
                    { text: '2-2-2', value: '2-2-2', parentVal: '2-2' },
                    { text: '3-1-1', value: '3-1-1', parentVal: '3-1' },
                    { text: '3-1-2', value: '3-1-2', parentVal: '3-1' },]
            }
        ];
        this.independentColumns = [
            {
                options: [{ text: '1', value: '1' },
                    { text: '2', value: '2' },
                    { text: '3', value: '3' }]
            },
            {
                options: [{ text: '1-1', value: '1-1' },
                    { text: '1-2', value: '1-2' },
                    { text: '2-1', value: '2-1' },
                    { text: '2-2', value: '2-2' },
                    { text: '3-1', value: '3-1' },]
            },
            {
                options: [{ text: '1-1-1', value: '1-1-1' },
                    { text: '1-1-2', value: '1-1-2' },
                    { text: '1-2-1', value: '1-2-1' },
                    { text: '1-2-2', value: '1-2-2' },
                    { text: '2-1-1', value: '2-1-1' },
                    { text: '2-1-2', value: '2-1-2' },
                    { text: '2-2-1', value: '2-2-1' },
                    { text: '2-2-2', value: '2-2-2' },
                    { text: '3-1-1', value: '3-1-1' },
                    { text: '3-1-2', value: '3-1-2' },]
            }
        ];
        this.cityPickerOption = [];
    };
    HomePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/home/home.html',
            directives: [ion_multi_picker_1.MultiPicker],
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.NavController])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
