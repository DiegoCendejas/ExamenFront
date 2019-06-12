import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirm } from '../components/home/modal-confirm.component';
import { HomeComponent } from '../components/home/home.component';

@NgModule({
  declarations: [ NgbdModalConfirm],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule
  ],
  exports: [],
  bootstrap: [],
  entryComponents: [NgbdModalConfirm]
})
export class ModalConfirmModule { }
