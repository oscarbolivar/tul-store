import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@modules/auth/services/auth.service';
import * as featureAction from '@state/auth/auth.actions';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import {
  FIREBASE_INVALID_EMAIL,
  FIREBASE_USER_NOT_FOUND,
  FIREBASE_WEAK_PASSWORD,
  FIREBASE_WRONG_PASSWORD
} from '@core/constants/firebase';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AUTH_LOGIN, HOME } from '@core/constants/routes';

@Injectable()
export class AuthEffect {
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
            const message = this._translate.instant(
              error.code === FIREBASE_USER_NOT_FOUND ||
                error.code === FIREBASE_WRONG_PASSWORD
                ? 'AUTH.LOGIN.MESSAGES.NOT_USER_FOUND'
                : error.code === FIREBASE_INVALID_EMAIL
                ? 'AUTH.USER_FORM.VALIDATIONS.INVALID_EMAIL'
                : 'AUTH.USER_FORM.MESSAGES.UNKNOWN_ERROR'
            );
            return featureAction.loginErrorAction({ message });
          })
      )
    )
  );

  public register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.registerAction),
      switchMap((action) =>
        this._service
          .register(action.email, action.password)
          .then((_) => {
            this._router.navigate(AUTH_LOGIN);
            return featureAction.registerSuccessAction();
          })
          .catch((error) => {
            const message = this._translate.instant(
              error.code === FIREBASE_WEAK_PASSWORD
                ? 'AUTH.USER_FORM.VALIDATIONS.WEAK_PASSWORD'
                : error.code === FIREBASE_INVALID_EMAIL
                ? 'AUTH.USER_FORM.VALIDATIONS.INVALID_EMAIL'
                : 'AUTH.USER_FORM.MESSAGES.UNKNOWN_ERROR'
            );
            return featureAction.registerErrorAction({ message });
          })
      )
    )
  );
}
