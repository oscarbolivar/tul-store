import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from '@modules/user/user-routing.module';
import { LoginComponent } from './components/login/login.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { UserContainer } from './container/user.container';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserFacade } from '@modules/user/facade/user.facade';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@NgModule({
  declarations: [LoginComponent, UserContainer],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    TranslateModule,
    NzButtonModule,
    NzPageHeaderModule
  ],
  providers: [UserFacade]
})
export class UserModule {}
