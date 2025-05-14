import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public modulo: string = 'GAR001';
  
  constructor(private http: HttpClient) {}

  private getHeaders() {
    return new HttpHeaders({
      'accept': '*/*',
      'modulo': this.modulo 
    });
  }

  getClientesAll(form: any): Observable<any> {

    let params: any = {};
    if (form.cdcli) params.cdcli = form.cdcli;
    if (form.cdfil) params.cdfil = form.cdfil;
    if (form.paisd) params.paisd = form.paisd;
    if (form.idtpd) params.idtpd = form.idtpd;

    return this.http.get(`${environment.base_url}/cadastro/clientes`, { headers: this.getHeaders(), params });
  }

}
