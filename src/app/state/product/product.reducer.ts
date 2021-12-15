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
  on(action.fetchPurchaseSuccessAction, (state, { purchase }) => {
    return {
      ...state,
      purchase: purchase.map((item) => {
        return { product_id: item.product_id, quantity: item.quantity };
      })
    };
  }),
  on(
    action.updateCartSuccessAction,
    (state, { transactionType, productId, indexProduct }) => {
      if (transactionType === TransactionType.ADD) {
        return {
          ...state,
          purchase: [...state.purchase, { product_id: productId, quantity: 1 }]
        };
      } else if (transactionType === TransactionType.UPDATE) {
        let newPurchase = !!state.purchase ? state.purchase : [];

        newPurchase = newPurchase.map((purchase, index) => {
          const quantity = purchase.quantity + 1;
          if (index === indexProduct) {
            purchase = { product_id: productId, quantity };
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
  ),
  on(action.deleteFromCartSuccessAction, (state, { productId }) => {
    return {
      ...state,
      purchase: state.purchase.filter(
        (purchase) => purchase.product_id !== productId
      )
    };
  })
);
