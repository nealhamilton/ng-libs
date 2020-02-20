import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQrReaderComponent } from './ngx-qr-reader.component';

describe('NgxQrReaderComponent', () => {
  let component: NgxQrReaderComponent;
  let fixture: ComponentFixture<NgxQrReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxQrReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxQrReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component on load', () => {
    it('should emit devices', async () => {
      spyOn(component.devices, 'emit').and.callThrough();

      await navigator.mediaDevices.enumerateDevices();
      component.ngOnInit();

      expect(component.devices.emit).toHaveBeenCalled();
    });
  });
});
