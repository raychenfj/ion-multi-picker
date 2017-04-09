import {element, by, browser} from 'protractor';

const SLEEP = 1000;
/**
 * Multi Picker E2E Test
 */
describe('MultiPicker', () => {
    beforeAll(() => {
        {
            browser.get('http://localhost:8100/');
        }
    });

    /**
     * Simple
     */
    describe('Simple', () => {
        it('should open picker', () => {
            browser.sleep(SLEEP);
            element(by.id('simple')).click();
        })

        it('should close picker', () => {
            browser.sleep(SLEEP);
            element.all(by.className('picker-button')).get(0).click();
        })

        it('should pick 2 1-2 1-1-2', () => {
            browser.sleep(SLEEP);
            element(by.id('simple')).click();
            browser.sleep(SLEEP);
            // Pick 2
            element.all(by.className('picker-col')).get(0).all(by.className('picker-opt')).get(1).click();
            // Pick 1-2
            element.all(by.className('picker-col')).get(1).all(by.className('picker-opt')).get(1).click();
            // Pick 1-1-2
            element.all(by.className('picker-col')).get(2).all(by.className('picker-opt')).get(1).click();
            browser.sleep(SLEEP);
            // Click Done
            element.all(by.className('picker-button')).get(1).click();
            browser.sleep(SLEEP);
            expect<any>(element(by.id('simple')).element(by.className('multi-picker-text')).getText()).toEqual('2 1-2 1-1-2');
        });
    });

    /**
     * Advanced
     */
    describe('Advanced', () => {
        it('should navigate to advanced', () => {
            browser.sleep(SLEEP);
            element.all(by.className('tab-button')).get(1).click();
        })

        it('should pick 2 2-2 2-2-2', () => {
            browser.sleep(SLEEP);
            element.all(by.id('advanced')).click();
            browser.sleep(SLEEP);
            //Pick 2
            element.all(by.className('picker-col')).get(0).all(by.className('picker-opt')).get(1).click();
            browser.sleep(SLEEP);
            //Pick 2-2
            element.all(by.className('picker-col')).get(1).all(by.className('picker-opt')).get(1).click();
            browser.sleep(SLEEP);
            //Pick 2-2-2
            element.all(by.className('picker-col')).get(2).all(by.className('picker-opt')).get(1).click();
            browser.sleep(SLEEP);
            // Click Done
            element.all(by.className('picker-button')).get(1).click();
            browser.sleep(SLEEP);
            expect<any>(element(by.id('advanced')).element(by.className('multi-picker-text')).getText()).toEqual('2 2-2 2-2-2');
        })

        it('should be disabled', () => {
            browser.sleep(SLEEP);
            element(by.className('multi-picke-disabled')).element(by.tagName('button')).click();
        });

        it('should have default value 1 1-2 1-2-2', () => {
            browser.sleep(SLEEP);
            expect<any>(element(by.id('default')).element(by.className('multi-picker-text')).getText()).toEqual('1 1-2 1-2-2');
        });

        it('should have default value Melon', () => {
            browser.sleep(SLEEP);
            expect<any>(element(by.id('fruit')).element(by.className('multi-picker-text')).getText()).toEqual('Melon');
        });

        it('should pick Banana', () => {
            browser.sleep(SLEEP);
            element(by.id('fruit')).click();
            browser.sleep(SLEEP);
            // Pick Banana
            element.all(by.className('picker-col')).get(0).all(by.className('picker-opt')).get(3).click();
            browser.sleep(SLEEP);
            // Click Done
            element.all(by.className('picker-button')).get(1).click();
            browser.sleep(SLEEP);
            expect<any>(element(by.id('fruit')).element(by.className('multi-picker-text')).getText()).toEqual('Banana');
        });

        it('should pick 2 2-1 1-2-2',()=>{
            browser.sleep(SLEEP);
            // Default value
            expect<any>(element(by.id('separator')).element(by.className('multi-picker-text')).getText()).toEqual('1_1-2_1-2-1');
            element(by.id('separator')).click();
            browser.sleep(SLEEP);
            // Pick 2
            element.all(by.className('picker-col')).get(0).all(by.className('picker-opt')).get(1).click();
            // Pick 2-1
            element.all(by.className('picker-col')).get(1).all(by.className('picker-opt')).get(2).click();
            // Pick 1-2-2
            element.all(by.className('picker-col')).get(2).all(by.className('picker-opt')).get(3).click();
            // Pick Done
            element.all(by.className('picker-button')).get(1).click();
            browser.sleep(SLEEP);
            expect<any>(element(by.id('separator')).element(by.className('multi-picker-text')).getText()).toEqual('2_2-1_1-2-2');
        });

        it('should pick 2-2-2 2-2 2', () => {
            browser.sleep(SLEEP);
            element(by.id('parent')).click();
            browser.sleep(SLEEP);
            // Pick 2
            element.all(by.className('picker-col')).get(2).all(by.className('picker-opt')).get(1).click();
            browser.sleep(SLEEP);
            // Pick 2-2
            element.all(by.className('picker-col')).get(1).all(by.className('picker-opt')).get(1).click();
            browser.sleep(SLEEP);
            // Pick 2-2-2
            element.all(by.className('picker-col')).get(0).all(by.className('picker-opt')).get(1).click();
            browser.sleep(SLEEP);
            // Pick Done
            element.all(by.className('picker-button')).get(1).click();
            browser.sleep(SLEEP);
            expect<any>(element(by.id('parent')).element(by.className('multi-picker-text')).getText()).toEqual('2-2-2 2-2 2');
        })
    });
});