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
import firebase from 'firebase';
import { HttpErrorResponse } from '@angular/common/http';
import { getProductIndexInCart } from '@modules/product/helpers/product.helper';

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
      catchError((error: HttpErrorResponse) =>
        of(featureAction.fetchProductsErrorAction({ message: error.message }))
      )
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
      catchError((error: HttpErrorResponse) =>
        of(featureAction.getPendingCartErrorAction({ message: error.message }))
      )
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
      catchError((error: HttpErrorResponse) =>
        of(featureAction.fetchPurchaseErrorAction({ message: error.message }))
      )
    )
  );

  public createCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.createCartAction),
      switchMap(() =>
        this._service
          .createCart()
          .then(() => featureAction.getPendingCartAction())
          .catch((error: firebase.FirebaseError) =>
            featureAction.createCartErrorAction({ message: error.message })
          )
      )
    )
  );

  public updateCartCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.updateCartAction),
      withLatestFrom(this._facade.cart$, this._facade.purchase$),
      switchMap(([action, cart, purchase]) => {
        const { transactionType, indexProduct } = getProductIndexInCart(
          action.productId,
          purchase
        );

        if (transactionType === TransactionType.ADD) {
          return this._service
            .addToCart(cart, action.productId, 1)
            .then(() =>
              featureAction.updateCartSuccessAction({
                productId: action.productId
              })
            )
            .catch((error: firebase.FirebaseError) =>
              featureAction.updateCartErrorAction({ message: error.message })
            );
        } else {
          return this._service
            .updateProductInCart(
              cart,
              action.productId,
              purchase[indexProduct]?.quantity + 1
            )
            .then(() =>
              featureAction.updateCartSuccessAction({
                productId: action.productId
              })
            )
            .catch((error: firebase.FirebaseError) =>
              featureAction.updateCartErrorAction({ message: error.message })
            );
        }
      })
    )
  );

  public deleteFromCartCart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.deleteFromCartAction),
      withLatestFrom(this._facade.cart$),
      switchMap(([action, cart]) =>
        this._service
          .deleteFromCart(cart, action.productId)
          .then(() =>
            featureAction.deleteFromCartSuccessAction({
              productId: action.productId
            })
          )
          .catch((error: firebase.FirebaseError) =>
            featureAction.deleteFromCartErrorAction({ message: error.message })
          )
      )
    )
  );

  public completeOrder$ = createEffect(() =>
    this._actions$.pipe(
      ofType(featureAction.completeOrderAction),
      withLatestFrom(this._facade.cart$),
      switchMap(([_, cart]) =>
        this._service
          .completeOrder(cart)
          .then(() => featureAction.completeOrderSuccessAction())
          .catch((error: firebase.FirebaseError) =>
            featureAction.completeOrderErrorAction({ message: error.message })
          )
      )
    )
  );
}
