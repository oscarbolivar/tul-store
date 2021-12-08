import { createAction, props } from '@ngrx/store';

export const isUserLoggedInAction = createAction('[Auth] Is User Logged In');

export const isUserLoggedInSuccessAction = createAction(
  '[Auth] Is User Logged In - Success',
  props<{ isLoggedIn: boolean }>()
);

export const isUserLoggedInErrorAction = createAction(
  '[Auth] Is User Logged In - Error'
);

export const loginAction = createAction(
  '[Auth] Login User',
  props<{ email: string; password: string }>()
);

export const loginSuccessAction = createAction('[Auth] Login User - Success');

export const loginErrorAction = createAction(
  '[Auth] Login User - Error',
  props<{ message: string }>()
);
