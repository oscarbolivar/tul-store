import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureAction from '@state/product/product.actions';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  withLatestFrom
} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ProductService } from '@modules/product/services/product.service';
import { ProductFacade } from '@modules/product/facade/product.facade';
import { TransactionType } from '@modules/product/models/product.model';

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
        this._service.fetchPendingCart$().pipe(
          take(1),
          mergeMap((pendingCart) => {
            const action = [];
            if (pendingCart.length === 0) {
              action.push(featureAction.createCartAction());
            } else {
              action.push(
                featureAction.getPendingCartSuccessAction({
                  cart: pendingCart[0]
                }),
                featureAction.fetchPurchaseAction({
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

  public fetchPurchase$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.fetchPurchaseAction),
      switchMap((action) =>
        this._service.fetchPurchase$(action.cart).pipe(
          map((purchase) =>
            featureAction.fetchPurchaseSuccessAction({
              purchase: purchase.docs.map((doc) => doc.data())
            })
          )
        )
      ),
      catchError(() => of(featureAction.fetchPurchaseErrorAction()))
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

  public updateCartCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.updateCartAction),
      withLatestFrom(this._facade.cart$, this._facade.purchase$),
      switchMap(([action, cart, purchase]) => {
        if (action.transactionType === TransactionType.ADD) {
          return this._service
            .addToCart(cart, action.productId, 1)
            .then(() => {
              return featureAction.updateCartSuccessAction({
                transactionType: action.transactionType,
                productId: action.productId,
                indexProduct: action.indexProduct
              });
            })
            .catch(() => {
              return featureAction.updateCartErrorAction();
            });
        } else {
          return this._service
            .updateProductInCart(
              cart,
              action.productId,
              purchase[action.indexProduct]?.quantity
            )
            .then(() => {
              return featureAction.updateCartSuccessAction({
                transactionType: action.transactionType,
                productId: action.productId,
                indexProduct: action.indexProduct
              });
            })
            .catch(() => {
              return featureAction.updateCartErrorAction();
            });
        }
      })
    )
  );

  public deleteFromCartCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.deleteFromCartAction),
      withLatestFrom(this._facade.cart$),
      switchMap(([action, cart]) => {
        return this._service
          .deleteFromCart(cart, action.productId)
          .then(() => {
            return featureAction.deleteFromCartSuccessAction({
              productId: action.productId
            });
          })
          .catch(() => {
            return featureAction.deleteFromCartErrorAction();
          });
      })
    )
  );
}
