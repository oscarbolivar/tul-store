export interface LoginState {
  isLoggedIn: boolean;
  working: boolean;
  completed: boolean;
  message: string;
}

export const INITIAL_LOGIN_STATE: LoginState = {
  isLoggedIn: false,
  working: false,
  completed: false,
  message: ''
};
