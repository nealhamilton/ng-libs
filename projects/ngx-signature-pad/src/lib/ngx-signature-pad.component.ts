import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-ngx-signature-pad',
  template: `
    <canvas id="sigPad" #signaturePad></canvas>
    <button id="sidPadDoneBtn" (click)="exportAsImg()">Done</button>
    <button id="sidPadDoneBtn" (click)="clearAll()">Reset</button>
  `,
  styles: [
    '#sigPad { background: whitesmoke; }'
  ]
})
export class NgxSignaturePadComponent implements OnInit {
  @ViewChild('signaturePad', { static: true }) signaturePad: ElementRef;
  @Input() width = 900;
  @Input() height = 300;
  @Input() filename: string;
  @Output() done = new EventEmitter<string>();
  canvasElement: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  boudingRect: DOMRect;

  isReady = false;
  isDrawing = false;

  output: string;

  wayPoints: {x: number, y: number, end: boolean }[] = [];

  drawingDirections = [];
  constructor() { }

  ngOnInit(): void {
    this.canvasElement = this.signaturePad.nativeElement;
    this.context = this.canvasElement.getContext('2d');
    this.context.canvas.height = this.height;
    this.context.canvas.width = this.width;
    this.boudingRect = this.canvasElement.getBoundingClientRect();
    this.clearCanvas(this.canvasElement, this.context);
    this.setupListeners(this.canvasElement);
  }

  setupListeners(canvas: HTMLCanvasElement) {
    // For Computers
    canvas.addEventListener('mousedown', this.handlePointerStart, false);
    canvas.addEventListener('mouseup', this.handlePointerEnd, false);
    canvas.addEventListener('mousemove', this.handlePointerMove, false);
    // For Touch Devices
    canvas.addEventListener('touchstart', this.handlePointerStart, false);
    canvas.addEventListener('touchend', this.handlePointerEnd, false);
    canvas.addEventListener('touchcancel', this.handlePointerEnd, false);
    canvas.addEventListener('touchmove', this.handlePointerMove, true);

    // If user leaves signature pad
    document.body.addEventListener('mouseup', this.handlePointerEnd, false);
    document.body.addEventListener('touchcancel', this.handlePointerEnd, false);

    // Canvas is now ready to accept signatures!
    this.isReady = true;
  }

  clearCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  clearSignature() {
    this.wayPoints = [];
  }

  handlePointerStart = (_: TouchEvent | MouseEvent) => {
    this.isDrawing = true;
  }

  handlePointerEnd = ($event: TouchEvent | MouseEvent) => {
    this.isDrawing = false;
    const len = this.wayPoints.length;
    if (this.wayPoints && this.wayPoints.length) {
      const last = this.wayPoints[len - 1];
      last.end = true;
    }
    this.draw(this.context, this.wayPoints);
  }

  handlePointerMove = ($event: TouchEvent | MouseEvent) => {
    if (this.isDrawing) {
      if ($event instanceof MouseEvent) {
        this.wayPoints.push({
          x: $event.offsetX,
          y: $event.offsetY,
          end: false
        });
      } else { // is touch
        this.wayPoints.push({
          x: $event.touches.item(0).clientX - this.boudingRect.left,
          y: $event.touches.item(0).clientY - this.boudingRect.top,
          end: false
        });
      }
      this.draw(this.context, this.wayPoints);
    }
  }

  draw(context: CanvasRenderingContext2D, wayPoints: {x: number, y: number, end: boolean }[], opts: any = {}) {
    this.clearCanvas(this.canvasElement, this.context);

    context.strokeStyle = opts.strokeStyle || '#000000F7';
    // context.lineJoin = opts.lineJoin || 'bevel';
    context.lineWidth = opts.lineWidth || 1;

    let curr;
    let last;


    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < wayPoints.length; i++) {
      context.beginPath();
      curr = wayPoints[i];

      if (last && !last.end) {
        context.moveTo(last.x, last.y);
      } else {
        context.moveTo(curr.x, curr.y);
      }

      this.drawingDirections = [];
      if (last && !last.end) {
        if (curr.x < last.x) {
          this.drawingDirections.push('←');
        }
        if (curr.x > last.x) {
          this.drawingDirections.push('→');
        }
        if (curr.y < last.y) {
          this.drawingDirections.push('↑');
        }
        if (curr.y > last.y) {
          this.drawingDirections.push('↓');
        }
        // ← ↖ ↑ ↗ → ↘ ↓ ↙
        context.bezierCurveTo(last.x, last.y, curr.x, curr.y, curr.x, curr.y);
      }


      last = curr;

      context.stroke();
      context.closePath();
    }
  }

  exportAsImg() {
    const img = this.signaturePad.nativeElement.toDataURL();
    this.output = img;
    this.done.emit(this.output);
    return img;
  }

  download(name = 'signature') {
    const link = document.createElement('a');
    link.download = this.filename || name;
    link.href = this.exportAsImg();
    link.click();
  }

  clearAll() {
    this.clearCanvas(this.canvasElement, this.context);
    this.clearSignature();
    this.output = null;
    this.done.emit(null);
  }
}
