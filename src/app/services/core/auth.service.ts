import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap, timestamp } from 'rxjs/operators';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alert: AlertService) { }

  login(body: any): Observable<boolean> {

        return this.http.post(`${environment.base_url}/login`, body ).pipe(
          map((authResponse: any) => {

            if (authResponse.token) {

              const data = authResponse.token.expire_datetime;
              const timestamp = new Date(data).getTime();
              const token = authResponse.token.acaccess_token;
    
              localStorage.setItem('expire_datetime', data);
              localStorage.setItem('expire_timestamp', timestamp.toString());
              localStorage.setItem('token', token );

              localStorage.setItem('codempresa', authResponse.codempresa);
              localStorage.setItem('usuarioauth', body.codusuario);
 
              this.alert.showSuccess('Login realizado com sucesso!');
              this.isAuthenticated = true;
              return true;
            } else {
              
              this.alert.showError('Erro ao realizar login. Verifique suas credenciais.');
              this.isAuthenticated = false;
              return false;
            }

          }),
          catchError((error: any) => {
            this.alert.showError(error.error.mesage);
            this.isAuthenticated = false;
            return of(false);
          })
        );
      }
  

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('codempresa');
    localStorage.removeItem('usuarioauth');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
