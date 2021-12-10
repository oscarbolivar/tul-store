import { authReducer } from '@state/auth/auth.reducer';
import { productReducer } from '@state/product/product.reducer';

export const APP_REDUCERS = { auth: authReducer, product: productReducer };
