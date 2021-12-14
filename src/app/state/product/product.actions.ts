import { createAction, props } from '@ngrx/store';
import {
  Cart,
  Product,
  Purchase,
  TransactionType
} from '@modules/product/models/product.model';

export const fetchProductsAction = createAction('[Product] Fetch Products');
export const fetchProductsSuccessAction = createAction(
  '[Product] Fetch Products - Success',
  props<{ products: Product[] }>()
);
export const fetchProductsErrorAction = createAction(
  '[Product] Fetch Products - Error'
);

export const getPendingCartAction = createAction(
  '[Product] Get a Pending Cart'
);
export const getPendingCartSuccessAction = createAction(
  '[Product] Get a Pending Cart - Success',
  props<{ cart: Cart }>()
);
export const getPendingCartErrorAction = createAction(
  '[Product] Get a Pending Cart - Error'
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
  '[Product] Fetch Purchase - Error'
);

export const createCartAction = createAction('[Product] Create a Cart');
export const createCartSuccessAction = createAction(
  '[Product] Create a Cart - Success'
);
export const createCartErrorAction = createAction(
  '[Product] Create a Cart - Error'
);

export const addToCartAction = createAction(
  '[Product] Add to Cart',
  props<{
    transactionType: TransactionType;
    product: Product;
    indexProduct: number;
  }>()
);
export const addToCartSuccessAction = createAction(
  '[Product] Add to Cart - Success'
);
export const addToCartErrorAction = createAction(
  '[Product] Add to Cart - Error'
);

export const deleteFromCartAction = createAction(
  '[Product] Delete from Cart',
  props<{ productId: string }>()
);
