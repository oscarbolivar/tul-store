import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './components/store/store.component';
import { ProductContainer } from '@modules/product/container/product.container';
import { CartComponent } from '@modules/product/components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: ProductContainer,
    children: [
      { path: '', redirectTo: 'store', pathMatch: 'full' },
      {
        path: 'store',
        component: StoreComponent
      },
      {
        path: 'cart',
        component: CartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
