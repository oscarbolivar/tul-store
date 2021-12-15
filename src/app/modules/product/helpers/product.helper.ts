import {
  ProductFounded,
  Purchase,
  TransactionType
} from '@modules/product/models/product.model';

export function getProductFoundedInCart(
  productId: string,
  purchase: Purchase[]
): ProductFounded {
  const indexProduct = purchase.findIndex(
    (item) => item.product_id === productId
  );
  const transactionType =
    indexProduct === -1 ? TransactionType.ADD : TransactionType.UPDATE;

  return { indexProduct, transactionType };
}
