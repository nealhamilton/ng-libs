import { NgModule } from '@angular/core';
import { NgxSignaturePadComponent } from './ngx-signature-pad.component';
import { SignaturePadComponent } from './signature-pad/signature-pad.component';



@NgModule({
  declarations: [NgxSignaturePadComponent, SignaturePadComponent],
  imports: [
  ],
  exports: [NgxSignaturePadComponent]
})
export class NgxSignaturePadModule { }
