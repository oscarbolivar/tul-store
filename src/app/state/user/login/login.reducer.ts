import { createReducer, on } from '@ngrx/store';
import { INITIAL_LOGIN_STATE } from './login.state';
import * as action from './login.actions';

export const loginReducer = createReducer(
  INITIAL_LOGIN_STATE,
  on(action.loginAction, (state) => ({
    ...state,
    isLoggedIn: true
  }))
);
