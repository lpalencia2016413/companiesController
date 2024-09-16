import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';
import { CompanyService } from './company.service';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public url: String;
  public token: any;
  public identidad: any;
  public employee: any;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient, public _companyService: CompanyService) {
    this.url = GlobalService.url , this.token = this._companyService.getToken(); }

  registroEmpleado(employee: Employee, token: any): Observable<any>{
    let params = JSON.stringify(employee);
    let headersToken = this.headersVariable.set('Authorization', this.getToken())
    return this._http.post(this.url + "registrarEmpleado", params , {headers: headersToken})
  }
  verEmpleados(): Observable<any>{
    let headersToken = this.headersVariable.set("Authorization", this.token);
    return this._http.get(this.url + "verEmpleados",  {headers: headersToken});

  }
  obtenerEmpleado(id: String, token: any): Observable<any>{
    let headersToken = this.headersVariable.set("Authorization", token);
    return this._http.get(this.url +"obtenerEmpleado/" + id, {headers: headersToken})
  }

  eliminarEmpleado(employee: any): Observable<any>{
    let params = JSON.stringify(employee);
    return this._http.post(this.url + "eliminarEmpleado", params, {headers: this.headersVariable})
  }

  obtenerGeneral(nombre: any, token: any): Observable<any>{
    let params = JSON.stringify(nombre);
    let headersToken = this.headersVariable.set("Authorization", token);
    return this._http.post(this.url+'obtenerGeneral', params, {headers: headersToken});
  }

  editarEmpleado(company: Employee, token: any): Observable<any>{
    let params = JSON.stringify(company);
    let headersToken = this.headersVariable.set("Authorization", token);
    return this._http.put(this.url + "editarEmpleado", params , {headers: headersToken})
  }

  obtenerEmpleadoNombre(nombre: any , token: any): Observable<any>{
    let params = JSON.stringify(nombre);
    let headersToken = this.headersVariable.set("Authorization", token);
    return this._http.post(this.url+'obtenerEmpleadoNom', params, {headers: headersToken});
  }

  getToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != "undefined"){
      this.token = token2;
    }else{
      this.token = null;
    }
    return this.token;
  }
  getEmpleados(){
    var employee2 = JSON.parse(localStorage.getItem("employeeSeleccionado")||"{}");
    if(employee2 != "undefined"){
      this.employee = employee2;
    }else {
      this.employee = null;
    }
    return this.employee;
  }
}
