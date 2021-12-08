import { createReducer, on } from '@ngrx/store';
import { INITIAL_LOGIN_STATE } from './login.state';
import * as action from './login.actions';

export const loginReducer = createReducer(
  INITIAL_LOGIN_STATE,
  on(action.loginAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(action.loginSuccessAction, (state) => ({
    ...state,
    isLoggedIn: true,
    working: false,
    completed: true
  })),
  on(action.loginErrorAction, (state) => ({
    ...state,
    isLoggedIn: false,
    working: false,
    completed: false
  }))
);
