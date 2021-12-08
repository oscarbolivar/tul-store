import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as action from '@state/user/login/login.actions';
import { Observable } from 'rxjs';
import * as selector from '@state/user/login/login.selector';
import { AppState } from '@state/app.state';

@Injectable()
export class UserFacade {
  constructor(private _store: Store<AppState>) {}

  public isLoggedIn$: Observable<boolean> = this._store.pipe(
    select(selector.isLoggedIn)
  );

  public login(email: string, password: string): void {
    this._store.dispatch(action.loginAction({ email, password }));
  }
}
