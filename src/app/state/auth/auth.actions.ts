import { createAction, props } from '@ngrx/store';

export const resetAction = createAction('[Auth] Reset');

export const isUserLoggedInAction = createAction('[Auth] Is User Logged In');

export const isUserLoggedInSuccessAction = createAction(
  '[Auth] Is User Logged In - Success'
);

export const isUserLoggedInErrorAction = createAction(
  '[Auth] Is User Logged In - Error',
  props<{ message: string }>()
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

export const signOutAction = createAction('[Auth] Sign Out User');

export const signOutSuccessAction = createAction(
  '[Auth] Sign Out User - Success'
);

export const signOutErrorAction = createAction(
  '[Auth] Sign Out User - Error',
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
