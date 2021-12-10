import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as action from '@state/product/product.actions';
import { AppState } from '@state/app.state';
import { Observable } from 'rxjs';
import * as selector from '@state/product/product.selector';
import { Product } from '@modules/product/models/product.model';

@Injectable()
export class ProductFacade {
  constructor(private _store: Store<AppState>) {}

  public products$: Observable<Product[]> = this._store.pipe(
    select(selector.products)
  );

  public working$: Observable<boolean> = this._store.pipe(
    select(selector.working)
  );

  public completed$: Observable<boolean> = this._store.pipe(
    select(selector.completed)
  );

  public message$: Observable<string> = this._store.pipe(
    select(selector.message)
  );

  public fetchProducts(): void {
    this._store.dispatch(action.fetchProductsAction());
  }
}
