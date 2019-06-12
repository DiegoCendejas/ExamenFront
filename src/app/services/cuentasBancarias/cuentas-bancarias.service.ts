import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { cuentaBancaria } from 'src/app/interfaces/cuentaBancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentasBancariasService {

  URL: string = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }

  crearCuenta(cuenta: cuentaBancaria) {
    let params = JSON.stringify(cuenta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL + 'cuentas', params, { headers: headers });
  }

  actualizarCuenta(cuenta: cuentaBancaria) {
    let params = JSON.stringify(cuenta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.URL + 'cuentas/' + cuenta.ID, params, { headers: headers });
  }

  borrarCuenta(ID: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(this.URL + 'cuentas/' + ID, { headers: headers });
  }

  listarCuentas() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.URL + 'cuentas', { headers: headers });
  }
  
  obtenerCuenta(ID: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.URL + 'cuentas/' + ID, { headers: headers });
  }

  listarBancos() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.URL + 'bancos', { headers: headers });
  }

}
