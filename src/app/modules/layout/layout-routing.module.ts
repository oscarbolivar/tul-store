import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutContainer } from '@modules/layout/container/layout/layout.container';

const routes: Routes = [
  {
    path: '',
    component: LayoutContainer,
    children: [
      { path: '', redirectTo: 'product', pathMatch: 'full' },
      {
        path: 'product',
        loadChildren: () =>
          import('../product/product.module').then((m) => m.ProductModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
