import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const tokenService=inject(TokenService);

  const isAuthenticated=!!tokenService.getAccessToken();

  const authRequired=route.data?.['authRequired']; //true or false

  // Case 1: Protected route
  if(authRequired && !isAuthenticated){
    return router.createUrlTree(['/']);
  }

  // Case 2: Public route but user already logged in
  if(!authRequired && isAuthenticated){
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
