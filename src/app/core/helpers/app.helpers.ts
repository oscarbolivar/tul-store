import {
  IS_LOGGED_IN,
  SESSION_IS_LOGGED_IN
} from '@core/constants/session-storage';
import { AUTH_LOGIN, HOME } from '@core/constants/routes';
import { Router } from '@angular/router';

export function userIsLoggedIn(router: Router): void {
  router.navigate(
    sessionStorage.getItem(SESSION_IS_LOGGED_IN) === IS_LOGGED_IN.YES
      ? HOME
      : AUTH_LOGIN
  );
}
