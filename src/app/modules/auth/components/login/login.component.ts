import { Component } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AUTH_LOGIN, AUTH_REGISTER, HOME } from '@core/constants/routes';
import { User } from '@modules/auth/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  constructor(private _facade: AuthFacade, private _router: Router) {}

  public isUserLoggedIn(): void {
    this._facade.isUserLoggedIn();

    setTimeout(() => {
      this.isLoggedIn$
        .subscribe((isLoggedIn) => {
          this._router.navigate(isLoggedIn ? HOME : AUTH_LOGIN);
        })
        .unsubscribe();
    }, 600);
  }

  public login(user: User): void {
    this._facade.login(user.email, user.password);
  }

  public goToRegister(): void {
    this._facade.reset();
    this._router.navigate(AUTH_REGISTER);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._facade.isLoggedIn$;
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
