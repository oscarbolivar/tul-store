import { Cart, Product, Purchase } from '@modules/product/models/product.model';

export interface ProductState {
  products: Product[];
  cart: Cart;
  purchase: Purchase[];
  workingLayout: boolean;
  completedLayout: boolean;
  working: boolean;
  completed: boolean;
  message: string;
}

export const INITIAL_PRODUCT_STATE: ProductState = {
  products: [],
  cart: {},
  purchase: [],
  workingLayout: false,
  completedLayout: false,
  working: false,
  completed: false,
  message: ''
};
