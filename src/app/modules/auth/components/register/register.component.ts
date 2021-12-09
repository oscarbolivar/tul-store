import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HOME } from '@core/constants/routes';
import { User } from '@modules/auth/models/auth.model';
import {
  IS_LOGGED_IN,
  SESSION_IS_LOGGED_IN
} from '@core/constants/session-storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  constructor(private _facade: AuthFacade, private _router: Router) {}

  ngOnInit(): void {
    sessionStorage.setItem(SESSION_IS_LOGGED_IN, IS_LOGGED_IN.NO);
  }

  public register(user: User): void {
    this._facade.register(user.email, user.password);
  }

  public goToLogin(): void {
    this._facade.reset();
    this._router.navigate(HOME);
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
