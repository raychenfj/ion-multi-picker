import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { MultiPicker } from '../../../src/components/multi-picker/multi-picker';

let comp:    MultiPicker;
let fixture: ComponentFixture<MultiPicker>;
let de:      DebugElement;
let el:      HTMLElement;

describe('MultiPicker',()=>{
    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[MultiPicker]
        });

        fixture = TestBed.createComponent(MultiPicker);

        comp = fixture.componentInstance;
    });

    // it('')
});