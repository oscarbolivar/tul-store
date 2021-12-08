import { createReducer, on } from '@ngrx/store';
import { INITIAL_LOGIN_STATE } from './login.state';
import * as action from './login.actions';

export const loginReducer = createReducer(
  INITIAL_LOGIN_STATE,
  on(action.isUserLoggedInSuccessAction, (state, { isLoggedIn }) => ({
    ...state,
    isLoggedIn
  })),
  on(action.loginAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(action.loginSuccessAction, (state) => ({
    ...state,
    working: false,
    completed: true,
    message: ''
  })),
  on(action.loginErrorAction, (state, { message }) => ({
    ...state,
    working: false,
    completed: false,
    message
  }))
);
