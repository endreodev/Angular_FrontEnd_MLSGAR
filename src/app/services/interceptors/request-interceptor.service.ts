import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { LoadingService } from '../core/loading.service';


@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService {

  constructor(

    private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loadingService.showLoading();

    const token = localStorage.getItem('token') ?? '';
    const cUrl: string = "login";
    let authRequest: any;

    if (!request.url.includes(cUrl)) {
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      authRequest = request;
    }

    return next.handle(authRequest).pipe(
      finalize(() => this.loadingService.hideLoading())
    );
  }
}
