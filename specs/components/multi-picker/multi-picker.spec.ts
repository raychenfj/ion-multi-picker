import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickerController, Form, Item } from 'ionic-angular';
import { MultiPicker } from '../../../src/components/multi-picker/multi-picker';

let comp: MultiPicker;
let fixture: ComponentFixture<MultiPicker>;

const pickerControllerStub = {
    create: function () {
        return pickerStub;
    }
}

const formStub = {
    register: function () { },
    deregister: function () { }
}

const itemStub = {
    registerInput: function () { },
    setElementClass: function () { }
};

const pickerStub = {
    columns: [],
    getColumns: function () {
        return this.columns;
    },
    addColumn: function (column) {
        this.columns.push(column);
    },
    present: function () { return Promise.resolve() },
    onDidDismiss: function () { },
    ionChange: { subscribe: function () { } },
    instance: {
        _cols: { toArray: function () { return [{}, {}, {}] } }
    }
}

describe('MultiPicker', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [MultiPicker],
            providers: [
                { provide: PickerController, useValue: pickerControllerStub },
                { provide: Form, useValue: formStub },
                { provide: Item, useValue: itemStub },
            ],

        });

        fixture = TestBed.createComponent(MultiPicker);

        comp = fixture.componentInstance;
    });

    it('should not open picker when disabled', () => {
        comp.disabled = true;
        expect(comp.open()).toBeUndefined();
    });

    it('should generate sequence from left to right', () => {
        comp._isDependent = false;
        comp.multiPickerColumns = [{}, {}, {}];
        comp.generateSequence();
        expect(comp._sequence).toEqual([0, 1, 2]);
    });

    it('should generate sequence from right to left', () => {
        comp._isDependent = true;
        comp.multiPickerColumns = [
            { name: 'child', parentCol: 'parent' },
            { name: 'parent', parentCol: 'ancestor' },
            { name: 'ancestor' }];
        comp.generateSequence();
        expect(comp._sequence).toEqual([2, 1, 0]);
    });

    it('should set value to empty', () => {
        comp.setValue(null);
        expect(comp.getValue()).toBe('');
        comp.setValue(undefined);
        expect(comp.getValue()).toBe('');
    });

    it('should set value to 1 1-1 1-1-1', () => {
        comp.setValue('1 1-1 1-1-1');
        expect(comp.getValue()).toBe('1 1-1 1-1-1');
    });

    it('should update text to 2 2-2 2-2-2', () => {
        comp.multiPickerColumns = [
            { options: [{ text: '2', value: '2' }] },
            { options: [{ text: '2-2', value: '2-2' }] },
            { options: [{ text: '2-2-2', value: '2-2-2' }] }
        ];
        comp.setValue('2 2-2 2-2-2');
        comp.ngAfterContentInit();
        expect(comp._text).toBe('2 2-2 2-2-2');
    });

    it('should return parentVal', () => {
        comp.multiPickerColumns = [
            { options: [{ text: '2', value: '2' }] },
            { options: [{ text: '2-2', value: '2-2', parentVal: '2' }] },
            { options: [{ text: '2-2-2', value: '2-2-2', parentVal: '2-2' }] }
        ];
        let option = { value: '2-2' };
        let parentVal = comp.getOptionParentValue(1, option);
        expect(parentVal).toBe('2');
    });

    it('should return parent column', () => {
        comp._sequence = [2, 1, 0];
        let columns = [{ name: 'child' }, { name: 'parent' }, { name: 'ancestor' }];
        expect(comp.getParentCol(2, columns)).toBeNull();
        expect(comp.getParentCol(1, columns)).toEqual(columns[2]);
    });

    it('should keep column width', () => {
        let shortColumns = [
            { columnWidth: '10px', options: [{ text: '2', value: '2' }] },
            { columnWidth: '30px', options: [{ text: '2-2', value: '2-2' }] },
        ];
        let middleColumns = [
            { columnWidth: '10px', options: [{ text: '2', value: '2' }] },
            { columnWidth: '30px', options: [{ text: '2-2', value: '2-2' }] },
            { columnWidth: '50px', options: [{ text: '2-2-2', value: '2-2-2' }] }
        ];
        let longColumns = [
            { columnWidth: '10px', options: [{ text: '2', value: '2' }] },
            { columnWidth: '30px', options: [{ text: '2-2', value: '2-2' }] },
            { columnWidth: '50px', options: [{ text: '2-2-2', value: '2-2-2' }] },
            { columnWidth: '70px', options: [{ text: '2-2-2-2', value: '2-2-2-2' }] }
        ];

        pickerStub.getColumns = function () {
            return shortColumns;
        }
        comp.divyColumns(pickerStub);
        expect(shortColumns[0]['columnWidth']).toBe('10px');
        expect(shortColumns[1]['columnWidth']).toBe('30px');

        pickerStub.getColumns = function () {
            return middleColumns;
        }
        comp.divyColumns(pickerStub);
        expect(middleColumns[0]['columnWidth']).toBe('10px');
        expect(middleColumns[1]['columnWidth']).toBe('30px');
        expect(middleColumns[2]['columnWidth']).toBe('50px');

        pickerStub.getColumns = function () {
            return longColumns;
        }
        comp.divyColumns(pickerStub);
        expect(longColumns[0]['columnWidth']).toBe('10px');
        expect(longColumns[1]['columnWidth']).toBe('30px');
        expect(longColumns[2]['columnWidth']).toBe('50px');
        expect(longColumns[3]['columnWidth']).toBe('70px');
    });

    it('should calculate column width', () => {
        let shortColumns = [
            { options: [{ text: '2', value: '2' }] },
            { options: [{ text: '2-2', value: '2-2' }] },
        ];
        let middleColumns = [
            { options: [{ text: '2', value: '2' }] },
            { options: [{ text: '2-2', value: '2-2' }] },
            { options: [{ text: '2-2-2', value: '2-2-2' }] }
        ];
        let longColumns = [
            { options: [{ text: '2', value: '2' }] },
            { options: [{ text: '2-2', value: '2-2' }] },
            { options: [{ text: '2-2-2', value: '2-2-2' }] },
            { options: [{ text: '2-2-2-2', value: '2-2-2-2' }] }
        ];

        pickerStub.getColumns = function () {
            return shortColumns;
        }
        comp.divyColumns(pickerStub);
        expect(shortColumns[0]['columnWidth']).toBe('48px');
        expect(shortColumns[1]['columnWidth']).toBe('48px');

        pickerStub.getColumns = function () {
            return middleColumns;
        }
        comp.divyColumns(pickerStub);
        expect(middleColumns[0]['columnWidth']).toBe('80px');
        expect(middleColumns[1]['columnWidth']).toBe('48px');
        expect(middleColumns[2]['columnWidth']).toBe('80px');

        pickerStub.getColumns = function () {
            return longColumns;
        }
        comp.divyColumns(pickerStub);
        expect(longColumns[0]['columnWidth']).toBe('12px');
        expect(longColumns[1]['columnWidth']).toBe('36px');
        expect(longColumns[2]['columnWidth']).toBe('60px');
        expect(longColumns[3]['columnWidth']).toBe('84px');
    });

    it('should convert data object to string value', () => {
        comp.multiPickerColumns = [{}, {}, {}];
        let data = {
            0: { value: '2' },
            1: { value: '2-2' },
            2: { value: '2-2-2' }
        };
        let value = comp.convertObjectToString(data);
        expect(value).toBe('2 2-2 2-2-2');
    });

    it('should generate a picker', () => {
        comp._value = '2 2-2 2-2-2';
        comp.multiPickerColumns = [
            { options: [{ text: '2', value: '2' }] },
            { options: [{ text: '2-2', value: '2-2', parentVal: '2' }] },
            { options: [{ text: '2-2-2', value: '2-2-2', parentVal: '2-2' }] }
        ];
        comp._isDependent = true;
        comp.generate(pickerStub);
        expect(pickerStub.columns.length).toBe(3);
    });

    it('should validate the picker', () => {
        let columns = [
            { selectedIndex: 1, options: [{ text: '1', value: '1' }, { text: '2', value: '2' }] },
            { selectedIndex: 0, options: [{ text: '1-1', value: '1-1' }, { text: '2-2', value: '2-2' }] },
            { selectedIndex: 0, options: [{ text: '1-1-1', value: '1-1-1' }, { text: '2-2-2', value: '2-2-2' }] }
        ];
        pickerStub.getColumns = function () { return columns }

        comp.multiPickerColumns = [
            { options: [{ text: '1', value: '1' }, { text: '2', value: '2' }] },
            { options: [{ text: '1-1', value: '1-1', parentVal: '1' }, { text: '2-2', value: '2-2', parentVal: '2' }] },
            { options: [{ text: '1-1-1', value: '1-1-1', parentVal: '1-1' }, { text: '2-2-2', value: '2-2-2', parentVal: '2-2' }] }
        ];
        comp._sequence = [0, 1, 2];
        let pickerColumnCmpStub: any = { setSelected: function () { } };
        comp._pickerColumnCmps = [pickerColumnCmpStub, pickerColumnCmpStub, pickerColumnCmpStub]

        comp.validate(pickerStub);
    });

    it('should open multi picker', () => {
        comp.multiPickerColumns = [
            { options: [{ text: '1', value: '1' }, { text: '2', value: '2' }] },
            { options: [{ text: '1-1', value: '1-1', parentVal: '1' }, { text: '2-2', value: '2-2', parentVal: '2' }] },
            { options: [{ text: '1-1-1', value: '1-1-1', parentVal: '1-1' }, { text: '2-2-2', value: '2-2-2', parentVal: '2-2' }] }
        ];
        let e: any = {
            preventDefault: function () { },
            stopPropagation: function () { }
        }
        comp._click(e);
    });

    it('should handle key up', () => {
        comp.multiPickerColumns = [
            { options: [{ text: '1', value: '1' }, { text: '2', value: '2' }] },
            { options: [{ text: '1-1', value: '1-1', parentVal: '1' }, { text: '2-2', value: '2-2', parentVal: '2' }] },
            { options: [{ text: '1-1-1', value: '1-1-1', parentVal: '1-1' }, { text: '2-2-2', value: '2-2-2', parentVal: '2-2' }] }
        ];
        comp._keyup();
    });

    it('should set and get disabled', () => {
        comp.disabled = true;
        expect(comp.disabled).toBeTruthy();
    });

    it('should change value and text', () => {
        comp.multiPickerColumns = [
            { options: [{ text: '2', value: '2' }] },
            { options: [{ text: '2-2', value: '2-2', parentVal: '2' }] },
            { options: [{ text: '2-2-2', value: '2-2-2', parentVal: '2-2' }] }
        ];
        let data = {
            0: { value: '2' },
            1: { value: '2-2' },
            2: { value: '2-2-2' }
        };
        comp.onChange(data);
        expect(comp._value).toBe('2 2-2 2-2-2');
        expect(comp._text).toBe('2 2-2 2-2-2');
    });

    it('should separate value and text with separator', () => {
        comp.multiPickerColumns = [
            { options: [{ text: '2', value: '2' }] },
            { options: [{ text: '2-2', value: '2-2', parentVal: '2' }] },
            { options: [{ text: '2-2-2', value: '2-2-2', parentVal: '2-2' }] }
        ];
        comp.separator = '_';
        let data = {
            0: { value: '2' },
            1: { value: '2-2' },
            2: { value: '2-2-2' }
        };
        comp.onChange(data);
        expect(comp._value).toBe('2_2-2_2-2-2');
        expect(comp._text).toBe('2_2-2_2-2-2');
    });
});