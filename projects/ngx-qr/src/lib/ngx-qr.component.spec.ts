import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQrComponent } from './ngx-qr.component';
import { ElementRef } from '@angular/core';

describe('NgxQrComponent', () => {
  let component: NgxQrComponent;
  let fixture: ComponentFixture<NgxQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxQrComponent);
    component = fixture.componentInstance;

    const canvasEl = document.getElementById('qrCanvas') as HTMLCanvasElement;
    component.canvas = {
      nativeElement: canvasEl
    } as ElementRef<HTMLCanvasElement>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleQrResponse', () => {
    it('should not call error.emit()', () => {
      spyOn(component.qrError, 'emit').and.callThrough();
      component.handleQrResponse(null);
      expect(component.qrError.emit).not.toHaveBeenCalled();
    });

    it('should call error.emit()', () => {
      spyOn(component.qrError, 'emit').and.callThrough();
      component.handleQrResponse(new Error('Error occurred!'));
      expect(component.qrError.emit).toHaveBeenCalled();
    });
  });

  describe('toCanvas', () => {
    it('should emit success', () => {
      spyOn(component.qrSuccess, 'emit').and.callThrough();
      component.toCanvas('Success!', component.canvas.nativeElement);
      expect(component.qrSuccess.emit).toHaveBeenCalled();
    });

    it('should emit success', () => {
      spyOn(component.qrSuccess, 'emit').and.callThrough();
      component.toCanvas('https://www.google.com', component.canvas.nativeElement);
      expect(component.qrSuccess.emit).toHaveBeenCalled();
    });
  });
});
