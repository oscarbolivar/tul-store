import { createAction, props } from '@ngrx/store';
import { Cart, Product, Purchase } from '@modules/product/models/product.model';

export const fetchProductsAction = createAction('[Product] Fetch Products');
export const fetchProductsSuccessAction = createAction(
  '[Product] Fetch Products - Success',
  props<{ products: Product[] }>()
);
export const fetchProductsErrorAction = createAction(
  '[Product] Fetch Products - Error',
  props<{ message: string }>()
);

export const getPendingCartAction = createAction(
  '[Product] Get a Pending Cart'
);
export const getPendingCartSuccessAction = createAction(
  '[Product] Get a Pending Cart - Success',
  props<{ cart: Cart }>()
);
export const getPendingCartErrorAction = createAction(
  '[Product] Get a Pending Cart - Error',
  props<{ message: string }>()
);

export const fetchPurchaseAction = createAction(
  '[Product] Fetch Purchase',
  props<{ cart: Cart }>()
);
export const fetchPurchaseSuccessAction = createAction(
  '[Product] Fetch Purchase - Success',
  props<{ purchase: Purchase[] }>()
);
export const fetchPurchaseErrorAction = createAction(
  '[Product] Fetch Purchase - Error',
  props<{ message: string }>()
);

export const createCartAction = createAction('[Product] Create a Cart');
export const createCartSuccessAction = createAction(
  '[Product] Create a Cart - Success'
);
export const createCartErrorAction = createAction(
  '[Product] Create a Cart - Error',
  props<{ message: string }>()
);

export const updateCartAction = createAction(
  '[Product] Update Cart',
  props<{ productId: string }>()
);
export const updateCartSuccessAction = createAction(
  '[Product] Update Cart - Success',
  props<{ productId: string }>()
);
export const updateCartErrorAction = createAction(
  '[Product] Update Cart - Error',
  props<{ message: string }>()
);

export const deleteFromCartAction = createAction(
  '[Product] Delete from Cart',
  props<{ productId: string }>()
);
export const deleteFromCartSuccessAction = createAction(
  '[Product] Delete from Cart - Success',
  props<{ productId: string }>()
);
export const deleteFromCartErrorAction = createAction(
  '[Product] Delete from Cart - Error',
  props<{ message: string }>()
);
