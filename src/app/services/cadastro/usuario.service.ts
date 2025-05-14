import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, timestamp } from 'rxjs/operators';
import Swal from 'sweetalert2';

export interface IUsuarioRequest {
  usucdemp: string | number;  // Changed to accept both string and number
  usucduop: string;
  usucdfil: string | number;  // Changed to accept both string and number
  usucddep: string;
  usucdtpv: string | number;  // Changed to accept both string and number
  usunores: string;
  usutpdoc: string;
  usunudoc: string;
  usuemail: string;
  usuuscad: string;
}

export interface IUsuarioEditRequest extends IUsuarioRequest {
  usucduop_orig: string;
  usutpdoc_orig: string;
  usunudoc_orig: string;
  usucdusu: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService { 

  modulo: string = 'CAD003';

  constructor(
    private router: Router,
    private http: HttpClient) { }
  
  
  getUsuarios(filterParams?: any): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    let params = new HttpParams();
    
    // Add filter parameters if they exist
    if (filterParams) {
      Object.keys(filterParams).forEach(key => {
        params = params.append(key, filterParams[key]);
      });
    }

    return this.http.get<any>(`${environment.base_url}/cadastro/usuarios`, { headers, params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        Swal.fire('Erro', 'Ocorreu um erro ao buscar os usuários!', error.message); 
        return of([]);
      })
    );
  }


  getUsuarioById(codusuario: string): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    const params = new HttpParams().set('codusuario', codusuario);

    return this.http.get<any>(`${environment.base_url}/cadastro/usuario`, { headers, params }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        Swal.fire({ icon: 'error',title: 'Erro',text: error.message ,position: 'top-end',timer: 5000});
        return of([]);
      })
    );
  }


  cadastrarUsuario(usuario: IUsuarioRequest): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    
    return this.http.post<any>(`${environment.base_url}/cadastro/usuario/novo`, usuario, { headers }).pipe(
      map((response) => {
        Swal.fire({ icon: 'success',title: 'Sucesso',text: 'Usuário cadastrado com sucesso!',position: 'top-end',timer: 5000});
        return response;
      }),
      catchError((error) => {
        Swal.fire({ icon: 'error',title: 'Erro',text: error.message ,position: 'top-end',timer: 5000});
        return of([]);
      })
    );
  }

  editarUsuario(usuario: IUsuarioEditRequest): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    
    return this.http.put<any>(`${environment.base_url}/cadastro/usuario/edicao`, usuario, { headers }).pipe(
      map((response) => {
        Swal.fire({ icon: 'success',title: 'Sucesso',text: 'Usuário editado com sucesso!',position: 'top-end',timer: 5000});
        return response;
      }),
      catchError((error) => {
        Swal.fire({ icon: 'error',title: 'Erro',text: error.message ,position: 'top-end',timer: 5000});
        return of([]);
      })
    );
  }

  excluirUsuario(codusuario: string): Observable<any> {
    const headers = new HttpHeaders().set('modulo', this.modulo);
    const params = new HttpParams().set('codusuario', codusuario);

    return this.http.delete<any>(`${environment.base_url}/cadastro/usuario/exclusao`, { headers, params }).pipe(
      map((response) => {
        Swal.fire({ icon: 'success',title: 'Sucesso',text: 'Usuário excluído com sucesso!',position: 'top-end',timer: 5000});
        return response;
      }),
      catchError((error) => {
        Swal.fire({ icon: 'error',title: 'Erro',text: error.message ,position: 'top-end',timer: 5000});
        return of([]);
      })
    );
  }
}
