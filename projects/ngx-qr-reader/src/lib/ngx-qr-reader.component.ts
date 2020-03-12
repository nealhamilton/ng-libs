import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from "@angular/core";

import {
  BrowserQRCodeReader,
  BarcodeFormat,
  DecodeHintType,
  Result,
  Exception,
  NotFoundException,
  ChecksumException,
  FormatException
} from "@zxing/library";

@Component({
  selector: "lib-ngx-qr-reader",
  template: `
    <video #preview id="ngx-qr-reader-preview"></video>
  `,
  styles: []
})
export class NgxQrReaderComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild("preview", { static: false }) preview: ElementRef<
    HTMLVideoElement
  >;

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
  @Output() devices: EventEmitter<MediaDeviceInfo[]> = new EventEmitter();
  @Output() scanResults: EventEmitter<string> = new EventEmitter();
  @Output() errors: EventEmitter<Error> = new EventEmitter();

  reader = new BrowserQRCodeReader();

  constructor() {}

  ngOnInit(): void {
    this.setupReader();
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => {
        this.devices.emit(
          devices.filter(device => device.kind === "videoinput")
        );
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes &&
      changes.selectedDevice &&
      changes.selectedDevice.currentValue
    ) {
      if (this.useDefaultDevice) {
        // use of undefined as device id,
        // defaults to using environment facing camera...
        this.startScanner(undefined, this.preview.nativeElement);
      } else {
        this.startScanner(
          changes.selectedDevice.currentValue.deviceId,
          this.preview.nativeElement
        );
      }
    }
  }

  ngOnDestroy() {
    this.reader.reset();
    this.reader.stopContinuousDecode();
  }

  setupReader() {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, this.formats);
    this.reader.hints = hints;
  }

  startScanner(deviceId: string, video: HTMLVideoElement) {
    this.reader.decodeFromVideoDevice(
      deviceId,
      video,
      (result: Result, err: Exception) => {
        if (result) {
          this.scanResults.emit(result.getText());
        }
        if (err) {
          if (
            err instanceof NotFoundException ||
            err instanceof ChecksumException ||
            err instanceof FormatException
          ) {
          } else {
            this.errors.emit(new Error(err.message));
          }
        }
      }
    );
  }
}
