import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthContainer } from '@modules/auth/container/auth.container';
import { LoginComponent } from '@modules/auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthContainer,
    children: [{ path: 'login', component: LoginComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
