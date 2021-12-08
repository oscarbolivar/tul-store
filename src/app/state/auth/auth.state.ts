export interface AuthState {
  isLoggedIn: boolean;
  working: boolean;
  completed: boolean;
  message: string;
}

export const INITIAL_AUTH_STATE: AuthState = {
  isLoggedIn: false,
  working: false,
  completed: false,
  message: ''
};
