import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from '@modules/product/product-routing.module';
import { StoreComponent } from '@modules/product/components/store/store.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductContainer } from '@modules/product/container/product.container';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { CartComponent } from './components/cart/cart.component';
import { NzListModule } from 'ng-zorro-antd/list';

@NgModule({
  declarations: [ProductContainer, StoreComponent, CartComponent],
  imports: [CommonModule, ProductRoutingModule, NzGridModule, NzCardModule, NzButtonModule, TranslateModule, NzListModule]
})
export class ProductModule {}
