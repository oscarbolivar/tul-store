import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductFacade } from '@modules/product/facade/product.facade';
import { Product, Purchase } from '@modules/product/models/product.model';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { getProductFoundedInCart } from '@modules/product/helpers/product.helper';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _facade: ProductFacade) {}

  ngOnInit(): void {
    this._facade.fetchProducts();
    this._facade.getPendingCart();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public updateCart(productId: string): void {
    this.purchase$
      .pipe(take(1), takeUntil(this._destroy$))
      .subscribe((purchase) => {
        const { transactionType, indexProduct } = getProductFoundedInCart(
          productId,
          purchase
        );

        this._facade.updateCart(transactionType, productId, indexProduct);
      });
  }

  get products$(): Observable<Product[]> {
    return this._facade.products$;
  }

  get purchase$(): Observable<Purchase[]> {
    return this._facade.purchase$;
  }
}
