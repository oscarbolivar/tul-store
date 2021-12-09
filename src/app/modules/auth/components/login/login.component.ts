import { Component } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AUTH_REGISTER } from '@core/constants/routes';
import { User } from '@modules/auth/models/auth.model';
import { userIsLoggedIn } from '@core/helpers/app.helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  constructor(private _facade: AuthFacade, private _router: Router) {}

  public isUserLoggedIn(): void {
    this._facade.isUserLoggedIn();
    userIsLoggedIn(this._router);
  }

  public login(user: User): void {
    this._facade.login(user.email, user.password);
  }

  public goToRegister(): void {
    this._facade.reset();
    this._router.navigate(AUTH_REGISTER);
  }

  get working$(): Observable<boolean> {
    return this._facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this._facade.completed$;
  }

  get message$(): Observable<string> {
    return this._facade.message$;
  }
}
