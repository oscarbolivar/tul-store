export interface AuthState {
  working: boolean;
  completed: boolean;
  message: string;
}

export const INITIAL_AUTH_STATE: AuthState = {
  working: false,
  completed: false,
  message: ''
};
