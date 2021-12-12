import { createSelector } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { ProductState } from '@state/product/product.state';

const productModule = (state: AppState) => state.product;

export const products = createSelector(
  productModule,
  (state: ProductState) => state.products
);

export const cart = createSelector(
  productModule,
  (state: ProductState) => state.cart
);

export const purchase = createSelector(
  productModule,
  (state: ProductState) => state.purchase
);
