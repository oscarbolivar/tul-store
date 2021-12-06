import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutComponent } from '@modules/layout/components/layout/layout.component';
import { LayoutRoutingModule } from '@modules/layout/layout-routing.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule, NzLayoutModule, NzMenuModule],
})
export class LayoutModule {}
