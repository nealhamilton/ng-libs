import { TestBed } from '@angular/core/testing';

import { NgxQrcodeScannerService } from './ngx-qrcode-scanner.service';

describe('NgxQrcodeScannerService', () => {
  let service: NgxQrcodeScannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxQrcodeScannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
