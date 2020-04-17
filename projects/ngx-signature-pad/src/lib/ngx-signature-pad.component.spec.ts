import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSignaturePadComponent } from './ngx-signature-pad.component';

describe('NgxSignaturePadComponent', () => {
  let component: NgxSignaturePadComponent;
  let fixture: ComponentFixture<NgxSignaturePadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSignaturePadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSignaturePadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
