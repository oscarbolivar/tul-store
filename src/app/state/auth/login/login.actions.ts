import { createAction, props } from '@ngrx/store';

export const loginAction = createAction(
  '[Auth] Login User',
  props<{ email: string; password: string }>()
);

export const loginSuccessAction = createAction(
  '[Auth] Login User - Success'
);

export const loginErrorAction = createAction('[Auth] Login User - Error');
