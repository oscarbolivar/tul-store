import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@modules/auth/services/auth.service';
import * as featureAction from '@state/auth/login/login.actions';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import {
  FIREBASE_INVALID_EMAIL,
  FIREBASE_USER_NOT_FOUND,
  FIREBASE_WRONG_PASSWORD
} from '@core/constants/firebase';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HOME } from '@core/constants/routes';

@Injectable()
export class LoginEffect {
  constructor(
    private _actions$: Actions,
    private _service: AuthService,
    private _translate: TranslateService,
    private _router: Router
  ) {}

  public isUserLoggedIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.isUserLoggedInAction),
      switchMap((_) =>
        this._service.isUserLoggedIn$().pipe(
          filter((user) => user !== undefined),
          map((user) => {
            return featureAction.isUserLoggedInSuccessAction({
              isLoggedIn: !!user
            });
          })
        )
      ),
      catchError(() => of(featureAction.isUserLoggedInErrorAction()))
    )
  );

  public login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.loginAction),
      switchMap((action) =>
        this._service
          .login(action.email, action.password)
          .then((_) => {
            this._router.navigate(HOME);
            return featureAction.loginSuccessAction();
          })
          .catch((error) => {
            const message =
              error.code === FIREBASE_USER_NOT_FOUND ||
              error.code === FIREBASE_WRONG_PASSWORD
                ? this._translate.instant('AUTH.LOGIN.MESSAGES.NOT_USER_FOUND')
                : error.code === FIREBASE_INVALID_EMAIL
                ? this._translate.instant(
                    'AUTH.USER_FORM.VALIDATIONS.EMAIL_MALFORMED'
                  )
                : this._translate.instant('AUTH.USER_FORM.MESSAGES.UNKNOWN_ERROR');
            return featureAction.loginErrorAction({ message });
          })
      )
    )
  );
}
