import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CadastroBasicoService {
    
  public modulo: string = 'CAD001';
  
  constructor(private http: HttpClient) {}

  private getHeaders() {
    return new HttpHeaders({
      'accept': '*/*',
      'modulo': this.modulo 
    });
  }


}
