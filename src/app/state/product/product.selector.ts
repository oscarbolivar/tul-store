import { createSelector } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { ProductState } from '@state/product/product.state';

const productModule = (state: AppState) => state.product;

export const products = createSelector(
  productModule,
  (state: ProductState) => state.products
);

export const working = createSelector(
  productModule,
  (state: ProductState) => state.working
);

export const completed = createSelector(
  productModule,
  (state: ProductState) => state.completed
);

export const message = createSelector(
  productModule,
  (state: ProductState) => state.message
);
