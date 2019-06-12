import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { cuentaBancaria } from 'src/app/interfaces/cuentaBancaria';
import { CuentasBancariasService } from 'src/app/services/cuentasBancarias/cuentas-bancarias.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {

  cuenta: cuentaBancaria = new cuentaBancaria();
  listofBanks: any[];
  modalRef: any;
  modalTitle: string;
  option: string;
  @Output() message: EventEmitter<object> = new EventEmitter();
  @ViewChild('content', { static: true }) modal: ElementRef;

  constructor(private modalService: NgbModal, private cuentaBancService: CuentasBancariasService) { }

  ngOnInit() {
    this.cuentaBancService.listarBancos().subscribe((response: any) => {
      if (response.status == "success") {
        this.listofBanks = response.data;
      }
    });
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { centered: true }).result.then((result) => {
      this.cuenta = new cuentaBancaria();
    }, (reason) => {
      this.cuenta = new cuentaBancaria();
    });
  }

  crearCuenta(element) {
    if (element.classList.contains('ng-valid')) {
      if (this.option == "Nuevo") {
        this.cuentaBancService.crearCuenta(this.cuenta).subscribe((response: any) => {
          if (response.status == "success") {
            this.message.emit({ status: "success", option: "Nuevo" });
            this.cuenta = new cuentaBancaria();
          }
          else
            alert('hubo un problema');
        });
      }
      else {
        this.cuentaBancService.actualizarCuenta(this.cuenta).subscribe((response: any) => {
          if (response.status == "success") {
            this.message.emit({ status: "success", option: "Edicion" });
            this.cuenta = new cuentaBancaria();
          }
          else
            alert('hubo un problema');
        });
      }
    }
    else
      alert('Complete los campos');
  }

}
