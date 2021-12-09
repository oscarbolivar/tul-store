import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AuthContainer } from './container/auth.container';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { RegisterComponent } from './components/register/register.component';
import { UserFormComponent } from './components/shared/user-form/user-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthContainer,
    RegisterComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    TranslateModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzSpinModule,
    NzAnchorModule
  ],
  providers: [AuthFacade]
})
export class AuthModule {}
