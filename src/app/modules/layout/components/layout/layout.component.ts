import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Router } from '@angular/router';
import { SESSION_EMAIL } from '@core/constants/session-storage';
import { userIsLoggedIn } from '@core/helpers/app.helpers';
import { PRODUCT_STORE } from '@core/constants/routes';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  constructor(private _authFacade: AuthFacade, private _router: Router) {}

  ngOnInit(): void {
    userIsLoggedIn(this._router);
  }

  public goToStore(): void {
    this._router.navigate(PRODUCT_STORE);
  }

  public signOut(): void {
    this._authFacade.signOut();
  }

  get userEmail(): string | null {
    return sessionStorage.getItem(SESSION_EMAIL);
  }
}
