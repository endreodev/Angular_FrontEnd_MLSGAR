import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, timestamp } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class DepartamentoService { 

  modulo: string = 'CAD001';

  constructor(
    private router: Router,
    private http: HttpClient) { }
  
  
  getDepartamentos(filterParams?: any): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    let params = new HttpParams();
    
    // Add filter parameters if they exist
    if (filterParams) {
      Object.keys(filterParams).forEach(key => {
        params = params.append(key, filterParams[key]);
      });
    }

    return this.http.get<any>(`${environment.base_url}/cadastro/departamentos`, { headers, params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          title: 'Erro',
          text: 'Ocorreu um erro ao buscar os departamentos!',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 5000
        });
        return of([]);
      })
    );
  }


  getDepartamentoById(depcddep: string): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    const params = new HttpParams().set('depcddep', depcddep);

    return this.http.get<any>(`${environment.base_url}/cadastro/departamento`, { headers, params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          title: 'Erro',
          text: 'Ocorreu um erro ao buscar o departamento !',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 5000
        });
        return of(null);
      })
    );
  }


  cadastrarDepartamento(body: any): Observable<any> {

    const headers = new HttpHeaders().set('modulo', this.modulo);

    body.depcdusu = localStorage.getItem('usuarioauth') || '';
    body.depuscad = localStorage.getItem('usuarioauth') || '';
    
    return this.http.post<any>(`${environment.base_url}/cadastro/departamento/novo`, body, { headers }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          title: 'Erro',
            text: error.error.mesage,
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 5000
        });
        return of(null);
      })
    );
  }

  editarDepartamento(body: any): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    body.depcdusu = localStorage.getItem('usuarioauth') || '';

    
    return this.http.put<any>(`${environment.base_url}/cadastro/departamento/edicao`, body, { headers }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          title: 'Erro',
          text: error.error.mesage,
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 5000
        });
        return of(null);
      })
    );
  }

  excluirDepartamento(depcddep: string): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    const params = new HttpParams().set('depcddep', depcddep);

    return this.http.delete<any>(`${environment.base_url}/cadastro/departamento/exclusao`, { headers, params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        Swal.fire({
          position: 'top-end',
          title: 'Erro',
          text: error.error.mesage,
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 5000
        });
        return of(null);
      })
    );
  }
}
