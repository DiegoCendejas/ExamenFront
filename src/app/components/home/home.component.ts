import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirm } from '../home/modal-confirm.component';
import { CuentasBancariasService } from '../../services/cuentasBancarias/cuentas-bancarias.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Examen';
  displayedColumns = ['ID', 'Alias', 'ID_Banco', 'Ultimos_Digitos', 'action'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(false, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(ModalFormComponent, { static: true }) Hijo: ModalFormComponent;

  constructor(private _modalService: NgbModal, private cuentaBancService: CuentasBancariasService) { }

  ngOnInit() {
    this.cuentaBancService.listarCuentas().subscribe((response: any) => {
      if (response.status == "success") {
        this.actualizarTabla(response.data);
      }
    });
  }

  actualizarTabla(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  selectChange(row) {
    this.selection.toggle(row);
  }

  edit(row) {
    this.Hijo.cuenta.ID = row.ID;
    this.Hijo.cuenta.Alias = row.Alias;
    this.Hijo.cuenta.ID_Banco = row.ID_Banco;
    this.Hijo.cuenta.Ultimos_Digitos = row.Ultimos_Digitos;
    this.Hijo.option = "Editar";
    this.Hijo.open(this.Hijo.modal);
  }

  delete(User_ID: string) {
    const modalref = this._modalService.open(NgbdModalConfirm, { centered: true });
    modalref.componentInstance.ID = User_ID;
    modalref.componentInstance.status.subscribe((status) => {
      this.ngOnInit();
      modalref.close();
    });
  }

  creado(obj) {
    if (obj.status == "success") {
      this.ngOnInit();
      this.Hijo.modalRef.close();
      if (obj.option == "Nuevo")
        alert('Se creo correctamente');
      else
        alert("Se modificó correctamente");
    }
  }

  definirValores() {
    this.Hijo.modalTitle = 'Registrar nueva cuenta';
    this.Hijo.option = 'Nuevo';
  }

}
