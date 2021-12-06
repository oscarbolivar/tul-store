import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@modules/layout/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
  },
  {
    path: 'user',
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'purchase',
    loadChildren: () =>
      import('../purchase/purchase.module').then((m) => m.PurchaseModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
