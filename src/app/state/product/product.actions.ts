import { createAction, props } from '@ngrx/store';
import { Product } from '@modules/product/models/product.model';

export const fetchProductsAction = createAction('[Product] Fetch Products');

export const fetchProductsSuccessAction = createAction(
  '[Product] Fetch Products - Success',
  props<{ products: Product[] }>()
);

export const fetchProductsErrorAction = createAction(
  '[Product] Fetch Products - Error',
  props<{ message: string }>()
);
