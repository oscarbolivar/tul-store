import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserFacade } from '@modules/user/facade/user.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _facade: UserFacade) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public submit(): void {
    console.log('submit', this.formGroup.value);
    this._facade.login();
  }

  get isDisabled(): boolean {
    return !this.formGroup.valid;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this._facade.isLoggedIn$;
  }
}
