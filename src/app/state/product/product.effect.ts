import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureAction from '@state/product/product.actions';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ProductService } from '@modules/product/services/product.service';
import { ProductFacade } from '@modules/product/facade/product.facade';

@Injectable()
export class ProductEffect {
  constructor(
    private _actions$: Actions,
    private _service: ProductService,
    private _translate: TranslateService,
    private _facade: ProductFacade
  ) {}

  public fetchProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.fetchProductsAction),
      switchMap(() =>
        this._service
          .fetchProducts$()
          .pipe(
            map((products) =>
              featureAction.fetchProductsSuccessAction({ products })
            )
          )
      ),
      catchError(() => of(featureAction.fetchProductsErrorAction()))
    )
  );

  public getPendingCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.getPendingCartAction),
      switchMap(() =>
        this._service.existsAPendingCart$().pipe(
          take(1),
          mergeMap((pendingCart) => {
            const action = [];
            if (pendingCart.length === 0) {
              action.push(featureAction.createCartAction());
            } else {
              action.push(
                featureAction.getPendingCartSuccessAction({
                  cart: pendingCart[0]
                })
              );
            }
            return action;
          })
        )
      ),
      catchError(() => of(featureAction.getPendingCartErrorAction()))
    )
  );

  public createCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.createCartAction),
      switchMap(() => {
        return this._service
          .createCart()
          .then(() => {
            return featureAction.getPendingCartAction();
          })
          .catch(() => {
            return featureAction.createCartErrorAction();
          });
      })
    )
  );
}
