import { createReducer, on } from '@ngrx/store';
import { INITIAL_PRODUCT_STATE } from './product.state';
import * as action from './product.actions';
import { TransactionType } from '@modules/product/models/product.model';

export const productReducer = createReducer(
  INITIAL_PRODUCT_STATE,
  on(action.fetchProductsSuccessAction, (state, { products }) => ({
    ...state,
    products
  })),
  on(action.getPendingCartSuccessAction, (state, { cart }) => ({
    ...state,
    cart
  })),
  on(
    action.addToCartAction,
    (state, { transactionType, product, indexProduct }) => {
      if (transactionType === TransactionType.ADD) {
        return {
          ...state,
          purchase: [...state.purchase, { product, quantity: 1 }]
        };
      } else if (transactionType === TransactionType.UPDATE) {
        let newPurchase = !!state.purchase ? state.purchase : [];

        newPurchase = newPurchase.map((purchase, index) => {
          const quantity = purchase.quantity + 1;
          if (index === indexProduct) {
            purchase = { product, quantity };
          }
          return purchase;
        });

        return {
          ...state,
          purchase: newPurchase
        };
      } else {
        return {
          ...state
        };
      }
    }
  )
);
