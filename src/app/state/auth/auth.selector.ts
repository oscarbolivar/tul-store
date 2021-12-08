import { createSelector } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { AuthState } from '@state/auth/auth.state';

const loginFeature = (state: AppState) => state.auth;

export const isLoggedIn = createSelector(
  loginFeature,
  (state: AuthState) => state.isLoggedIn
);

export const working = createSelector(
  loginFeature,
  (state: AuthState) => state.working
);

export const completed = createSelector(
  loginFeature,
  (state: AuthState) => state.completed
);

export const message = createSelector(
  loginFeature,
  (state: AuthState) => state.message
);
