import { createSelector } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { LoginState } from '@state/auth/login/login.state';

const loginFeature = (state: AppState) => state.login;

export const isLoggedIn = createSelector(
  loginFeature,
  (state: LoginState) => state.isLoggedIn
);
