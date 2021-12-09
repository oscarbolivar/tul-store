import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutComponent } from '@modules/layout/components/layout/layout.component';
import { LayoutRoutingModule } from '@modules/layout/layout-routing.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    TranslateModule
  ],
  providers: [AuthFacade]
})
export class LayoutModule {}
