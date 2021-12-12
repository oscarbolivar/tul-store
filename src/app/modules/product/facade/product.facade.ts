import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as action from '@state/product/product.actions';
import { AppState } from '@state/app.state';
import { Observable } from 'rxjs';
import * as selector from '@state/product/product.selector';
import {
  Cart,
  Product,
  Purchase,
  TransactionType
} from '@modules/product/models/product.model';

@Injectable()
export class ProductFacade {
  constructor(private _store: Store<AppState>) {}

  public products$: Observable<Product[]> = this._store.pipe(
    select(selector.products)
  );

  public cart$: Observable<Cart> = this._store.pipe(select(selector.cart));

  public purchase$: Observable<Purchase[]> = this._store.pipe(
    select(selector.purchase)
  );

  public fetchProducts(): void {
    this._store.dispatch(action.fetchProductsAction());
  }

  public getPendingCart(): void {
    this._store.dispatch(action.getPendingCartAction());
  }

  public createCart(): void {
    this._store.dispatch(action.createCartAction());
  }

  public addToCart(
    transactionType: TransactionType,
    product: Product,
    indexProduct: number
  ): void {
    this._store.dispatch(
      action.addToCartAction({ transactionType, product, indexProduct })
    );
  }

  public deleteFromCart(productId: string): void {
    this._store.dispatch(action.deleteFromCartAction({ productId }));
  }
}
