import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQrcodeScannerComponent } from './ngx-qrcode-scanner.component';

describe('NgxQrcodeScannerComponent', () => {
  let component: NgxQrcodeScannerComponent;
  let fixture: ComponentFixture<NgxQrcodeScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxQrcodeScannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxQrcodeScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
