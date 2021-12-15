import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AUTH_LOGIN } from '@core/constants/routes';
import { AuthService } from '@modules/auth/services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private _service: AuthService, private _router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return new Promise((resolve) => {
      this._service.isUserLoggedIn().then((isLoggedIn) => {
        if (isLoggedIn) {
          resolve(true);
        } else {
          this._router.navigate(AUTH_LOGIN);
          resolve(false);
        }
      });
    });
  }
}
