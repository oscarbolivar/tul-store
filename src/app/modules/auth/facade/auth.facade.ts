import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as action from '@state/auth/auth.actions';
import { Observable } from 'rxjs';
import * as selector from '@state/auth/auth.selector';
import { AppState } from '@state/app.state';

@Injectable()
export class AuthFacade {
  constructor(private _store: Store<AppState>) {}

  public working$: Observable<boolean> = this._store.pipe(
    select(selector.working)
  );

  public completed$: Observable<boolean> = this._store.pipe(
    select(selector.completed)
  );

  public message$: Observable<string> = this._store.pipe(
    select(selector.message)
  );

  public reset(): void {
    this._store.dispatch(action.resetAction());
  }

  public login(email: string, password: string): void {
    this._store.dispatch(action.loginAction({ email, password }));
  }

  public signOut(): void {
    this._store.dispatch(action.signOutAction());
  }

  public register(email: string, password: string): void {
    this._store.dispatch(action.registerAction({ email, password }));
  }
}
