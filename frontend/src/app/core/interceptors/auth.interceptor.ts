// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService, private authService:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getAccessToken();

    if(token){
        const modifiedReq=req.clone({
            setHeaders:{
                Authorization:`Bearer ${token}`
            }
        })
        return next.handle(modifiedReq).pipe(catchError((error)=>{
          // If token expired → call refresh token
          if(error.status===401){
            return this.authService.refreshToken().pipe(switchMap((res)=>{
              // Save new token
              this.tokenService.setTokens(res.accessToken);

              // Retry original request
              const newReq=req.clone({
                setHeaders:{Authorization: `Bearer ${res.accessToken}`}
              });

              return next.handle(newReq);
            }))
          }

          return throwError(()=>error)
        }))
    }
    return next.handle(req);
  }
}