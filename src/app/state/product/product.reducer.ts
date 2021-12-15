import { createReducer, on } from '@ngrx/store';
import { INITIAL_PRODUCT_STATE } from './product.state';
import * as action from './product.actions';
import { TransactionType } from '@modules/product/models/product.model';
import { getProductIndexInCart } from '@modules/product/helpers/product.helper';

export const productReducer = createReducer(
  INITIAL_PRODUCT_STATE,
  on(action.fetchProductsAction, (state) => ({
    ...state,
    workingLayout: true,
    completedLayout: false
  })),
  on(action.fetchProductsSuccessAction, (state, { products }) => ({
    ...state,
    products,
    workingLayout: false,
    completedLayout: true,
    message: ''
  })),
  on(
    action.fetchProductsErrorAction,
    action.getPendingCartErrorAction,
    action.fetchPurchaseErrorAction,
    action.updateCartErrorAction,
    action.deleteFromCartErrorAction,
    (state, { message }) => ({
      ...state,
      workingLayout: false,
      completedLayout: false,
      message
    })
  ),

  on(action.getPendingCartAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(action.getPendingCartSuccessAction, (state, { cart }) => ({
    ...state,
    cart,
    working: false,
    completed: true,
    message: ''
  })),

  on(action.fetchPurchaseAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(action.fetchPurchaseSuccessAction, (state, { purchase }) => ({
    ...state,
    purchase: purchase.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity
    })),
    working: false,
    completed: true,
    message: ''
  })),

  on(action.updateCartAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(action.updateCartSuccessAction, (state, { productId }) => {
    const stateSuffix = {
      working: false,
      completed: true,
      message: ''
    };

    const { transactionType, indexProduct } = getProductIndexInCart(
      productId,
      state.purchase
    );

    switch (transactionType) {
      case TransactionType.ADD:
        return {
          ...state,
          purchase: [...state.purchase, { product_id: productId, quantity: 1 }],
          ...stateSuffix
        };
      case TransactionType.UPDATE:
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
          purchase: newPurchase,
          ...stateSuffix
        };
      default:
        return {
          ...state,
          ...stateSuffix
        };
    }
  }),

  on(action.deleteFromCartAction, (state) => ({
    ...state,
    working: true,
    completed: false
  })),
  on(action.deleteFromCartSuccessAction, (state, { productId }) => ({
    ...state,
    purchase: state.purchase.filter(
      (purchase) => purchase.product_id !== productId
    ),
    working: false,
    completed: true,
    message: ''
  }))
);
