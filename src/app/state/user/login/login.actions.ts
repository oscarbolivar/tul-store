import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
  '[User/Login] Login User',
  props<{ email: string; password: string }>()
);

export const loginSuccessAction = createAction(
  '[User/Login] Login User - Success'
);

export const loginErrorAction = createAction('[User/Login] Login User - Error');
