import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const routeurl: string = state.url;
    return this.isLogin(routeurl);
  }

  isLogin(routeurl: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.redirectUrl = routeurl;
    this.router.navigate(['/login'], { queryParams: { returnUrl: routeurl } });
  }
}
