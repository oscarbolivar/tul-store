import { createReducer, on } from '@ngrx/store';
import { INITIAL_AUTH_STATE } from './auth.state';
import * as action from './auth.actions';

export const authReducer = createReducer(
  INITIAL_AUTH_STATE,
  on(action.reset, (state) => ({
    ...state,
    message: ''
  })),
  on(action.isUserLoggedInSuccessAction, (state, { isLoggedIn }) => ({
    ...state,
    isLoggedIn
  })),
  on(action.loginAction, action.registerAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(action.loginSuccessAction, action.registerSuccessAction, (state) => ({
    ...state,
    working: false,
    completed: true,
    message: ''
  })),
  on(
    action.loginErrorAction,
    action.registerErrorAction,
    (state, { message }) => ({
      ...state,
      working: false,
      completed: false,
      message
    })
  )
);
