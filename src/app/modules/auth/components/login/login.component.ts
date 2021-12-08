import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _facade: AuthFacade) {}

  ngOnInit(): void {
    this._facade.isUserLoggedIn();

    this.formGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
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
