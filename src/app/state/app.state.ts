import { INITIAL_AUTH_STATE, AuthState } from './auth/auth.state';

export interface AppState {
  auth: AuthState;
}

export const INITIAL_APP_STATE = {
  auth: INITIAL_AUTH_STATE
};
