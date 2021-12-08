import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HOME, LOGIN } from '@core/constants/routes';

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
    setTimeout(() => {
      this.isLoggedIn$
        .subscribe((isLoggedIn) => {
          this._router.navigate(isLoggedIn ? HOME : LOGIN);
        })
        .unsubscribe();
    }, 600);
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._authFacade.isLoggedIn$;
  }
}
