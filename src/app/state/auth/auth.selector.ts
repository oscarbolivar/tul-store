import { createSelector } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { AuthState } from '@state/auth/auth.state';

const authModule = (state: AppState) => state.auth;

export const working = createSelector(
  authModule,
  (state: AuthState) => state.working
);

export const completed = createSelector(
  authModule,
  (state: AuthState) => state.completed
);

export const message = createSelector(
  authModule,
  (state: AuthState) => state.message
);
