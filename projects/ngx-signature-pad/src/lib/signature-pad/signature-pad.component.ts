import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'lib-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent implements AfterViewInit {
  @ViewChild('sigPad', { static: true }) canvas: HTMLCanvasElement;
  @Input() strokeColor: string;
  @Input() strokeWidth: number;

  context: CanvasRenderingContext2D;
  clickX = [];
  clickY = [];
  clickDrag = [];
  paint;

  constructor() { }

  ngAfterViewInit(): void {
    this.context = this.canvas.getContext('2d');

    this.canvas.addEventListener('mousedown', this.mouseDown, false);
    this.canvas.addEventListener('mousemove', this.mouseXY, false);
    document.body.addEventListener('mouseup', this.mouseUp, false);

    // For mobile
    this.canvas.addEventListener('touchstart', this.mouseDown, false);
    this.canvas.addEventListener('touchmove', this.mouseXY, true);
    this.canvas.addEventListener('touchend', this.mouseUp, false);
    document.body.addEventListener('touchcancel', this.mouseUp, false);
  }

  draw() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.strokeStyle = this.strokeColor;
      this.context.lineJoin = 'miter';
      this.context.lineWidth = this.strokeWidth;

      for (let i = 0; i < this.clickX.length; i++) {
          this.context.beginPath();
          if (this.clickDrag[i] && i) {
                this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
          } else {
                this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
          }
          this.context.lineTo(this.clickX[i], this.clickY[i]);
          this.context.stroke();
          this.context.closePath();
    }
  }

  addClick(x, y, dragging) {
      this.clickX.push(x);
      this.clickY.push(y);
      this.clickDrag.push(dragging);
  }

  mouseDown(e) {
     const mouseX = e.pageX - this.canvas.offsetLeft;
     const mouseY = e.pageY - this.canvas.offsetTop;

     this.paint = true;
     this.addClick(mouseX, mouseY, false);
     this.draw();
  }

  mouseUp() {
    this.paint = false;
  }
  mouseXY(e) {
    if (this.paint) {
        this.addClick(e.pageX - this.canvas.offsetLeft, e.pageY - this.canvas.offsetTop, true);
        this.draw();
    }
  }
}

