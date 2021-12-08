export interface LoginState {
  isLoggedIn: boolean;
  completed: boolean;
  working: boolean;
  message: string;
}

export const INITIAL_LOGIN_STATE: LoginState = {
  isLoggedIn: false,
  completed: false,
  working: false,
  message: ''
};
