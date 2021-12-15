import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Router } from '@angular/router';
import { SESSION_EMAIL } from '@core/constants/session-storage';
import { PRODUCT_CART, PRODUCT_STORE } from '@core/constants/routes';
import { ProductFacade } from '@modules/product/facade/product.facade';
import { userIsLoggedIn } from '@modules/auth/helpers/auth.helper';
import { Observable } from 'rxjs';
import { Purchase } from '@modules/product/models/product.model';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout.container.html',
  styleUrls: ['./layout.container.sass']
})
export class LayoutContainer implements OnInit {
  constructor(
    private _authFacade: AuthFacade,
    private _productFacade: ProductFacade,
    private _router: Router
  ) {}

  ngOnInit(): void {
    userIsLoggedIn(this._router);
  }

  public goToStore(): void {
    this._router.navigate(PRODUCT_STORE);
  }

  public goToCart(): void {
    this._router.navigate(PRODUCT_CART);
  }

  public signOut(): void {
    this._authFacade.signOut();
  }

  get userEmail(): string | null {
    return sessionStorage.getItem(SESSION_EMAIL);
  }

  get purchase$(): Observable<Purchase[]> {
    return this._productFacade.purchase$;
  }

  get workingLayout$(): Observable<boolean> {
    return this._productFacade.workingLayout$;
  }

  get completedLayout$(): Observable<boolean> {
    return this._productFacade.completedLayout$;
  }
}
