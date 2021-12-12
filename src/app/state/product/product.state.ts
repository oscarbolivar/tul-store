import { Cart, Product, Purchase } from '@modules/product/models/product.model';

export interface ProductState {
  products: Product[];
  cart: Cart;
  purchase: Purchase[];
}

export const INITIAL_PRODUCT_STATE: ProductState = {
  products: [],
  cart: {},
  purchase: []
};
