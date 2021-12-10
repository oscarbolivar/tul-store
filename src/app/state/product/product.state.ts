import { Product } from '@modules/product/models/product.model';

export interface ProductState {
  products: Product[];
  working: boolean;
  completed: boolean;
  message: string;
}

export const INITIAL_PRODUCT_STATE: ProductState = {
  products: [],
  working: false,
  completed: false,
  message: ''
};
