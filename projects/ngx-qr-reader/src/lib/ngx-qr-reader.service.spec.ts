import { TestBed } from '@angular/core/testing';

import { NgxQrReaderService } from './ngx-qr-reader.service';

describe('NgxQrReaderService', () => {
  let service: NgxQrReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxQrReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
