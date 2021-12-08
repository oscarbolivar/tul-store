import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserContainer } from '@modules/user/container/user.container';
import { LoginComponent } from '@modules/user/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: UserContainer,
    children: [{ path: 'login', component: LoginComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
