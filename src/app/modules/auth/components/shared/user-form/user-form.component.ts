import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@modules/auth/models/auth.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {
  @Input() title!: string;
  @Input() buttonTitle!: string;
  @Input() goToTitle!: string;
  @Input() working!: boolean;
  @Input() completed!: boolean;
  @Input() message!: string;

  @Output() onSubmit: EventEmitter<User> = new EventEmitter<User>();
  @Output() onGoTo: EventEmitter<void> = new EventEmitter<void>();

  public formGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  public submit(): void {
    this.onSubmit.emit({
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    });
  }

  public goTo(): void {
    this.onGoTo.emit();
  }

  get isDisabled(): boolean {
    return !this.formGroup.valid;
  }
}
