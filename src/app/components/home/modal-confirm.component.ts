import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CuentasBancariasService } from '../../services/cuentasBancarias/cuentas-bancarias.service';

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Eliminación de cuenta</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Estas seguro que deseas eliminar esta cuenta bancaria?</strong></p>
    <p>Toda la informaci&oacute;n asociada a esta cuenta ser&aacute; permanentemente eliminada.<br/>
    <span class="text-danger">Esta operación no puede ser deshecha.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" ngbAutofocus class="btn btn-outline-secondary" (click)="modal.dismiss()">Cancelar</button>
    <button type="button" class="btn btn-danger" (click)="eliminar()">Eliminar</button>
  </div>
  `
})
export class NgbdModalConfirm {

  @Input() public ID: any;
  @Output() status: EventEmitter<any> = new EventEmitter();

  constructor(public modal: NgbActiveModal, private cuentaBancService: CuentasBancariasService) { }

  eliminar() {
    //eliminar registro
    this.cuentaBancService.borrarCuenta(this.ID).subscribe((response: any) => {
      if (response.status == "success") {
        this.status.emit(true);
      }
    });

  }
}