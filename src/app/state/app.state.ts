import { INITIAL_LOGIN_STATE, LoginState } from './user/login/login.state';

export interface AppState {
  login: LoginState;
}

export const INITIAL_APP_STATE = {
  login: INITIAL_LOGIN_STATE
};
