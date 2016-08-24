import { AfterContentInit, EventEmitter, OnDestroy, Provider } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Picker, PickerController, Form, Item } from 'ionic-angular';
import { MultiPickerColumn } from './multi-picker-options';
export declare const MULTI_PICKER_VALUE_ACCESSOR: Provider;
export declare class MultiPicker implements AfterContentInit, ControlValueAccessor, OnDestroy {
    private _form;
    private _item;
    private _pickerCtrl;
    private _disabled;
    private _labelId;
    private _text;
    private _fn;
    private _isOpen;
    private _value;
    /**
     * @private
     */
    id: string;
    /**
     * @private
     */
    /**
     * @input {string} The text to display on the picker's cancel button. Default: `Cancel`.
     */
    cancelText: string;
    /**
     * @input {string} The text to display on the picker's "Done" button. Default: `Done`.
     */
    doneText: string;
    /**
     * @input
     */
    multiPickerColumns: MultiPickerColumn[];
    /**
     * @output {any} Any expression to evaluate when the multi picker selection has changed.
     */
    ionChange: EventEmitter<any>;
    /**
     * @output {any} Any expression to evaluate when the multi pickker selection was cancelled.
     */
    ionCancel: EventEmitter<any>;
    constructor(_form: Form, _item: Item, _pickerCtrl: PickerController);
    private _click(ev);
    private _keyup();
    /**
     * @private
     */
    open(): void;
    /**
     * @private
     */
    generate(picker: Picker): void;
    /**
     * @private
     */
    validate(picker: Picker): void;
    getOptionParentValue(colIndex: any, option: any): any;
    /**
     * @private
     */
    divyColumns(picker: Picker): void;
    /**
     * @private
     */
    setValue(newData: any): void;
    /**
     * @private
     */
    getValue(): string;
    /**
     * @private
     */
    checkHasValue(inputValue: any): void;
    /**
     * @private
     */
    updateText(): void;
    /**
     * @input {boolean} Whether or not the multi picker component is disabled. Default `false`.
     */
    disabled: boolean;
    /**
     * @private
     */
    writeValue(val: any): void;
    /**
     * @private
     */
    ngAfterContentInit(): void;
    /**
     * @private
     */
    registerOnChange(fn: Function): void;
    /**
     * @private
     */
    registerOnTouched(fn: any): void;
    /**
    * @private
    */
    onChange(val: any): void;
    /**
    * @private
    */
    onTouched(): void;
    /**
    * @private
    */
    ngOnDestroy(): void;
    /**
    * @private convert the Picker ionChange event object data to string
    */
    convertObjectToString(newData: any): string;
}
