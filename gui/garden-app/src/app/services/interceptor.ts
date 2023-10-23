import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';


@Injectable()
export class Interceptor implements HttpInterceptor {
    //, private router: Router
    
    constructor(private userService: StorageService, private router:Router) { 
      this.router = inject(Router);
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string | null = localStorage.getItem('token');
        if(token){
            req = req.clone({
                setHeaders:{
                    authorization: `Bearer ${ token }`
                }
                //headers:new HttpHeaders({ 'Content-Type': 'application/json' },{})
            });
        }
        //var headers = this.userService.isLogedIn ? new HttpHeaders({ 'Content-Type': 'application/json' },{}) : new HttpHeaders({ 'Content-Type': 'application/json' },{}) 
        
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
      
              if (err.status === 401) {
                this.router.navigateByUrl('/login');
              }
      
              return throwError(() => err);
      
            })
        );
          
    }
    addAuthToken(req: HttpRequest<any>): HttpRequest<any> {
        // Get the authentication token from the user service
        const token = this.userService.getToken();

        // Add the authentication token to the request headers
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });

        return req;
    }
}
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ];