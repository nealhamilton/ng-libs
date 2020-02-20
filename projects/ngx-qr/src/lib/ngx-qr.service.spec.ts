import { TestBed } from '@angular/core/testing';

import { NgxQrService } from './ngx-qr.service';

describe('NgxQrService', () => {
  let service: NgxQrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxQrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
