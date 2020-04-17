import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from "@angular/core";

import { BrowserQRCodeReader, BarcodeFormat, Result } from "@zxing/library";

@Component({
  selector: "lib-ngx-qrcode-scanner",
  template: `
    <select (change)="selectDevice($event.target.value)">
      <option *ngFor="let device of devices" [value]="device.deviceId"
        >{{ device.label }}
      </option>
    </select>
    <br />
    <video id="preview"></video>
  `,
  styles: []
})
export class NgxQrcodeScannerComponent implements OnInit, OnDestroy {
  @Input() selectedDevice: MediaDeviceInfo;
  @Input() useDefaultDevice: boolean = false;
  @Input() formats: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.ITF,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.RSS_14
  ];
  @Output() scanResults: EventEmitter<string> = new EventEmitter();
  @Output() errors: EventEmitter<Error> = new EventEmitter();
  devices: MediaDeviceInfo[] = [];

  codeReader = new BrowserQRCodeReader();

  constructor() {}

  ngOnInit(): void {
    this.getDevices();
    this.selectDevice();
  }

  ngOnDestroy() {
    this.codeReader.reset();
  }

  getDevices() {
    this.codeReader
      .listVideoInputDevices()
      .then((devices: MediaDeviceInfo[]) => {
        this.devices = devices;
      });
  }

  selectDevice(deviceId: string = undefined) {
    this.codeReader.reset();
    this.codeReader.decodeOnceFromVideoDevice(deviceId, "preview").then(
      (result: Result) => {
        this.scanResults.emit(result.getText());
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
