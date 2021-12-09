import {
  IS_LOGGED_IN,
  SESSION_IS_LOGGED_IN
} from '@core/constants/session-storage';
import { AUTH_LOGIN, HOME } from '@core/constants/routes';
import { Router } from '@angular/router';

export function userIsLoggedIn(router: Router): void {
  setTimeout(() => {
    const isLoggedIn = sessionStorage.getItem(SESSION_IS_LOGGED_IN);
    router.navigate(isLoggedIn === IS_LOGGED_IN.YES ? HOME : AUTH_LOGIN);
  }, 600);
}
