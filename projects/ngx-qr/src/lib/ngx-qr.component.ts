import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";
import QRCode from "qrcode";

@Component({
  selector: "lib-ngx-qr",
  template: `
    <canvas #qrCanvas id="qrCanvas"></canvas>
  `,
  styles: []
})
export class NgxQrComponent implements AfterViewInit {
  /** Data to be converted to QR code */
  @Input() data: string;

  /** HTMLCanvasElement for housing the generated qr code */
  @ViewChild("qrCanvas", { static: false }) canvas: ElementRef<
    HTMLCanvasElement
  >;

  /** Emits errors from qr generation to user */
  @Output() qrError: EventEmitter<any> = new EventEmitter();

  /** Emits errors from qr generation to user */
  @Output() qrSuccess: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngAfterViewInit(): void {
    this.toCanvas(this.data, this.canvas.nativeElement);
  }

  toCanvas(data: string, element: HTMLCanvasElement) {
    QRCode.toCanvas(element, data, err => {
      this.handleQrResponse(err);
    });
  }

  handleQrResponse(error: any) {
    if (error) {
      this.qrError.emit(new Error(error));
    } else {
      this.qrSuccess.emit({
        success: true,
        data: this.data,
        elemRef: this.canvas.nativeElement
      });
    }
  }
}
