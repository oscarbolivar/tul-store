import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from '@modules/product/product-routing.module';
import { StoreComponent } from '@modules/product/components/store/store.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductContainer } from '@modules/product/container/product.container';

@NgModule({
  declarations: [ProductContainer, StoreComponent],
  imports: [CommonModule, ProductRoutingModule, NzGridModule, NzCardModule]
})
export class ProductModule {}
