import { Product } from '@modules/product/models/product.model';

export enum CartStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface Cart {
  id: string;
  status: CartStatus;
}

export interface Purchase {
  cart: Cart;
  product: Product;
  quantity: number;
}
