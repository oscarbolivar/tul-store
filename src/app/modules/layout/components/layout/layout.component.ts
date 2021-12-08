import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass']
})
export class LayoutComponent implements OnInit {
  constructor(private _authFacade: AuthFacade) {}

  ngOnInit(): void {
    this._authFacade.isUserLoggedIn();
  }
}
