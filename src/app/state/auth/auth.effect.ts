import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@modules/auth/services/auth.service';
import * as featureAction from '@state/auth/auth.actions';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import {
  FIREBASE_EMAIL_ALREADY_IN_USE,
  FIREBASE_INVALID_EMAIL,
  FIREBASE_USER_NOT_FOUND,
  FIREBASE_WEAK_PASSWORD,
  FIREBASE_WRONG_PASSWORD
} from '@core/constants/firebase';
import { Router } from '@angular/router';
import { AUTH_LOGIN, HOME } from '@core/constants/routes';
import { SESSION_EMAIL } from '@core/constants/session-storage';
import firebase from 'firebase';

@Injectable()
export class AuthEffect {
  constructor(
    private _actions$: Actions,
    private _service: AuthService,
    private _translate: TranslateService,
    private _router: Router
  ) {}

  public login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.loginAction),
      switchMap((action) =>
        this._service
          .login(action.email, action.password)
          .then(() => {
            sessionStorage.setItem(SESSION_EMAIL, action.email);
            this._router.navigate(HOME);
            return featureAction.loginSuccessAction();
          })
          .catch((error: firebase.FirebaseError) => {
            const message = this._translate.instant(
              error.code === FIREBASE_USER_NOT_FOUND ||
                error.code === FIREBASE_WRONG_PASSWORD
                ? 'AUTH.LOGIN.MESSAGES.NOT_USER_FOUND'
                : error.code === FIREBASE_INVALID_EMAIL
                ? 'AUTH.USER_FORM.VALIDATIONS.INVALID_EMAIL'
                : 'AUTH.USER_FORM.MESSAGES.GENERIC_ERROR'
            );
            return featureAction.loginErrorAction({ message });
          })
      )
    )
  );

  public signOut$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.signOutAction),
      switchMap(() =>
        this._service
          .signOut()
          .then(() => {
            sessionStorage.removeItem(SESSION_EMAIL);
            this._router.navigate(AUTH_LOGIN);
            return featureAction.signOutSuccessAction();
          })
          .catch(() =>
            featureAction.signOutErrorAction({
              message: 'AUTH.USER_FORM.MESSAGES.GENERIC_ERROR'
            })
          )
      )
    )
  );

  public register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.registerAction),
      switchMap((action) =>
        this._service
          .register(action.email, action.password)
          .then(() => {
            sessionStorage.setItem(SESSION_EMAIL, action.email);
            this._router.navigate(HOME);
            return featureAction.registerSuccessAction();
          })
          .catch((error: firebase.FirebaseError) => {
            const message = this._translate.instant(
              error.code === FIREBASE_WEAK_PASSWORD
                ? 'AUTH.USER_FORM.VALIDATIONS.WEAK_PASSWORD'
                : error.code === FIREBASE_INVALID_EMAIL
                ? 'AUTH.USER_FORM.VALIDATIONS.INVALID_EMAIL'
                : error.code === FIREBASE_EMAIL_ALREADY_IN_USE
                ? 'AUTH.USER_FORM.VALIDATIONS.EMAIL_ALREADY_IN_USE'
                : 'AUTH.USER_FORM.MESSAGES.GENERIC_ERROR'
            );
            return featureAction.registerErrorAction({ message });
          })
      )
    )
  );
}
