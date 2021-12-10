import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureAction from '@state/product/product.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ProductService } from '@modules/product/services/product.service';

@Injectable()
export class ProductEffect {
  constructor(
    private _actions$: Actions,
    private _service: ProductService,
    private _translate: TranslateService
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
      catchError(() => {
        const message = this._translate.instant(
          'PRODUCT.FETCH.MESSAGES.GENERIC_ERROR'
        );
        return of(featureAction.fetchProductsErrorAction({ message }));
      })
    )
  );
}
