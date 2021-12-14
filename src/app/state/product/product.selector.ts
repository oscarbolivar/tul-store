import { createSelector } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { ProductState } from '@state/product/product.state';
import { Product, Purchase } from '@modules/product/models/product.model';

const productModule = (state: AppState) => state.product;

export const products = createSelector(
  productModule,
  (state: ProductState) => state.products
);

export const cart = createSelector(
  productModule,
  (state: ProductState) => state.cart
);

export const purchase = createSelector(
  productModule,
  (state: ProductState) => state.purchase
);

export const purchaseMapped = createSelector(purchase, products, mapPurchase);

function mapPurchase(_purchase: Purchase[], _products: Product[]): Purchase[] {
  if (_purchase === null || _products === null) {
    return [];
  }

  const purchaseMap: Purchase[] = [];

  _products.forEach((product) => {
    _purchase
      .filter((item) => item.product_id === product.id)
      .map((item) => {
        purchaseMap.push({
          name: product.name,
          product_id: item.product_id,
          quantity: item.quantity
        });
        return purchaseMap;
      });
  });

  return purchaseMap;
}
