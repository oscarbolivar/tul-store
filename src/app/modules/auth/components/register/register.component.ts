import { Component } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AUTH_LOGIN } from '@core/constants/routes';
import { User } from '@modules/auth/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  constructor(private _facade: AuthFacade, private _router: Router) {}

  public register(user: User): void {
    this._facade.register(user.email, user.password);
  }

  public goToLogin(): void {
    this._router.navigate(AUTH_LOGIN);
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
