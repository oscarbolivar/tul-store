import { createAction, props } from '@ngrx/store';

export const reset = createAction('[Auth] Reset');

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

export const registerAction = createAction(
  '[Auth] Register User',
  props<{ email: string; password: string }>()
);

export const registerSuccessAction = createAction(
  '[Auth] Register User - Success'
);

export const registerErrorAction = createAction(
  '[Auth] Register User - Error',
  props<{ message: string }>()
);
