import { Component, OnInit, ViewChild, ElementRef, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { BrowserQRCodeReader, Result, Exception, NotFoundException, ChecksumException, FormatException } from '@zxing/library';

@Component({
  selector: 'lib-ngx-qr-reader',
  template: `
    <video #preview id="ngx-qr-reader-preview"></video>
  `,
  styles: []
})
export class NgxQrReaderComponent implements OnInit, OnChanges {
  @ViewChild('preview', { static: false }) preview: ElementRef<HTMLVideoElement>;

  @Input() selectedDevice: MediaDeviceInfo;
  @Output() devices: EventEmitter<MediaDeviceInfo[]> = new EventEmitter();
  @Output() scanResults: EventEmitter<string> = new EventEmitter();
  @Output() errors: EventEmitter<Error> = new EventEmitter();

  reader = new BrowserQRCodeReader();

  constructor() { }

  ngOnInit(): void {
    navigator.mediaDevices.enumerateDevices().then( (devices: MediaDeviceInfo[]) => {
      this.devices.emit(devices.filter( device => device.kind === 'videoinput'));
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedDevice.currentValue !== changes.selectedDevice.previousValue) {
      this.startScanner(changes.selectedDevice.currentValue.deviceId, this.preview.nativeElement);
    }
  }

  startScanner(deviceId: string, video: HTMLVideoElement) {
    this.reader.decodeFromVideoDevice(deviceId, video, (result: Result, err: Exception) => {
      if ( result ) {
        this.scanResults.emit(result.getText());
      }
      if (err) {
        if (err instanceof NotFoundException ||
          err instanceof ChecksumException ||
          err instanceof FormatException
          ) {
        } else {
          this.errors.emit(new Error(err.message));
        }
      }
    });
  }
}
