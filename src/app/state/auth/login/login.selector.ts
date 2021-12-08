import { createSelector } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { LoginState } from '@state/auth/login/login.state';

const loginFeature = (state: AppState) => state.login;

export const isLoggedIn = createSelector(
  loginFeature,
  (state: LoginState) => state.isLoggedIn
);

export const working = createSelector(
  loginFeature,
  (state: LoginState) => state.working
);

export const completed = createSelector(
  loginFeature,
  (state: LoginState) => state.completed
);

export const message = createSelector(
  loginFeature,
  (state: LoginState) => state.message
);
