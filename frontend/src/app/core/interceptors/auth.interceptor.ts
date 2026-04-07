import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserStateService } from '../services/user-state/user-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private userStateService:UserStateService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getAccessToken();

    // Add Authorization header if access token exists
    const authReq = token
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
      : req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((error) => {
        // 1. Stop infinite loop on refresh token call
        if (req.url.includes('refresh-token') || req.url.includes('signout')) {
          this.handleSessionExpired();
          return throwError(() => error);
        }

        // 2. Access token expired → try refresh
        if (error.status === 401 && this.tokenService.getAccessToken()) {
          return this.authService.refreshToken().pipe(
            switchMap((res) => {
              // Save new access token
              this.tokenService.setTokens(res.accessToken);

              // Retry original request
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${res.accessToken}` },
                withCredentials: true
              });
              return next.handle(newReq);
            }),
            catchError((err) => {
              // Refresh token failed → session expired
              this.handleSessionExpired();
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }

  private handleSessionExpired() {
    // Clear all stored tokens / user info
    this.tokenService.clearTokens();
    this.userStateService.clearUser();

    // Optionally show toastr
    this.toastr.error('Session expired. Please sign in again.', 'Logged Out');

    // Redirect to sign-in page
    this.router.navigate(['/auth/signin']);
  }
}