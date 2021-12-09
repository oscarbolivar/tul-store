import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Router } from '@angular/router';
import { SESSION_EMAIL } from '@core/constants/session-storage';
import { userIsLoggedIn } from '@core/helpers/app.helpers';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  constructor(private _authFacade: AuthFacade, private _router: Router) {}

  ngOnInit(): void {
    this._authFacade.isUserLoggedIn();
  }

  ngAfterViewInit(): void {
    userIsLoggedIn(this._router);
  }

  public signOut(): void {
    this._authFacade.signOut();
  }

  get sessionEmail(): string | null {
    return sessionStorage.getItem(SESSION_EMAIL);
  }
}
