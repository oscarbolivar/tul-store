import { AuthState, INITIAL_AUTH_STATE } from './auth/auth.state';
import {
  INITIAL_PRODUCT_STATE,
  ProductState
} from '@state/product/product.state';

export interface AppState {
  auth: AuthState;
  product: ProductState;
}

export const INITIAL_APP_STATE = {
  auth: INITIAL_AUTH_STATE,
  product: INITIAL_PRODUCT_STATE
};
