import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HOME, LOGIN } from '@core/constants/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public formGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _facade: AuthFacade,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._facade.isUserLoggedIn();

    this.formGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
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

  public submit(): void {
    this._facade.login(
      this.formGroup.value.email,
      this.formGroup.value.password
    );
  }

  get isDisabled(): boolean {
    return !this.formGroup.valid;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._facade.isLoggedIn$;
  }

  get working$(): Observable<boolean> {
    return this._facade.working$;
  }

  get completed$(): Observable<boolean> {
    return this._facade.completed$;
  }

  get message$(): Observable<string> {
    return this._facade.message$;
  }
}
