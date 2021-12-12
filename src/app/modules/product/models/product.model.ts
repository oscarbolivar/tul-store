export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
}

export enum CART_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export interface Cart {
  id?: string;
  status?: CART_STATUS;
}

export interface Purchase {
  product: Product;
  quantity: number;
}

export enum TransactionType {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete'
}

export interface ProductFounded {
  indexProduct: number;
  transactionType: TransactionType;
}
