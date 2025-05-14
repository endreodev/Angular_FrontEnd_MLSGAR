import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {

      const expireTimestamp = localStorage.getItem('expire_timestamp');
      const timestampAtual = new Date().getTime();

      if (expireTimestamp && Number(expireTimestamp) > timestampAtual) {
        return true;
      }
      
      this.authService.logout();
      this.router.navigate(['authentication/login']);
      return false;
    }
    this.router.navigate(['authentication/login']);
    return false;
  }
}
