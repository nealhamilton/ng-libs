import { NgModule } from "@angular/core";
import { NgxQrcodeScannerComponent } from "./ngx-qrcode-scanner.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [NgxQrcodeScannerComponent],
  imports: [CommonModule],
  exports: [NgxQrcodeScannerComponent]
})
export class NgxQrcodeScannerModule {}
