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
    this.formGroup = this._formBuilder.group({
      email: [null, [Validators.required]],
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

  get isLoggedIn$(): Observable<boolean> {
    return this._facade.isLoggedIn$;
  }
}
