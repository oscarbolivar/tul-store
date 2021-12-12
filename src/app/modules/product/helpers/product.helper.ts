import {
  Product,
  ProductFounded,
  Purchase,
  TransactionType
} from '@modules/product/models/product.model';

export function getProductFoundedInCart(
  product: Product,
  purchase: Purchase[]
): ProductFounded {
  const indexProduct = purchase.findIndex(
    (item) => item.product.id === product.id
  );
  const transactionType =
    indexProduct === -1 ? TransactionType.ADD : TransactionType.UPDATE;

  return { indexProduct, transactionType };
}
