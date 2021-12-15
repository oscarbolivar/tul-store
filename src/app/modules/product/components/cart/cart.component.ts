import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, Purchase } from '@modules/product/models/product.model';
import { ProductFacade } from '@modules/product/facade/product.facade';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent {
  constructor(private _facade: ProductFacade) {}

  public deleteFromCart(productId: string): void {
    this._facade.deleteFromCart(productId);
  }

  public completeOrder(): void {
    this._facade.completeOrderAction();
  }

  get cart$(): Observable<Cart> {
    return this._facade.cart$;
  }

  get purchase$(): Observable<Purchase[]> {
    return this._facade.purchase$;
  }
}
