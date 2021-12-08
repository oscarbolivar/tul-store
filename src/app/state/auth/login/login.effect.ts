import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@modules/auth/services/auth.service';
import * as featureAction from '@state/auth/login/login.actions';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class LoginEffect {
  constructor(private _actions$: Actions, private _service: AuthService) {}

  public login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.loginAction),
      switchMap((action) =>
        this._service
          .login(action.email, action.password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('user', user);
            return featureAction.loginSuccessAction();
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error', errorCode, errorMessage);
            return featureAction.loginErrorAction();
          })
      )
    )
  );
}
