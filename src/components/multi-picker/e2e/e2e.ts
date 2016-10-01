declare const element, by, browser;

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
            //The first Column, second option
            element.all(by.className('picker-col')).get(0).all(by.className('picker-opt')).get(1).click();
            //The second Column, second option
            element.all(by.className('picker-col')).get(1).all(by.className('picker-opt')).get(1).click();
            //The third Column, second option
            element.all(by.className('picker-col')).get(2).all(by.className('picker-opt')).get(1).click();
            browser.sleep(SLEEP);
            element.all(by.className('picker-button')).get(1).click();
            browser.sleep(SLEEP);
            expect(element(by.id('simple')).element(by.className('multi-picker-text')).getText()).toEqual('2 1-2 1-1-2');
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
            element.all(by.className('picker-col')).get(1).all(by.className('picker-opt')).get(3).click();
            browser.sleep(SLEEP);
            //Pick 2-2-2
            element.all(by.className('picker-col')).get(2).all(by.className('picker-opt')).get(7).click();
            browser.sleep(SLEEP);
            element.all(by.className('picker-button')).get(1).click();
            browser.sleep(SLEEP);
            expect(element(by.id('advanced')).element(by.className('multi-picker-text')).getText()).toEqual('2 2-2 2-2-2');
        })

        it('should be disabled',()=>{
            browser.sleep(SLEEP);
            element(by.className('multi-picke-disabled')).element(by.tagName('button')).click();
        });

        it('should have default value 1 1-2 1-2-2',()=>{
            browser.sleep(SLEEP);
            expect(element(by.id('default')).element(by.className('multi-picker-text')).getText()).toEqual('1 1-2 1-2-2');
        });
    });
});