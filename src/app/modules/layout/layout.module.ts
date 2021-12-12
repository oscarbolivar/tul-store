import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LayoutRoutingModule } from '@modules/layout/layout-routing.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { TranslateModule } from '@ngx-translate/core';
import { AuthFacade } from '@modules/auth/facade/auth.facade';
import { LayoutContainer } from '@modules/layout/container/layout/layout.container';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [LayoutContainer],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    TranslateModule,
    NzIconModule
  ],
  providers: [AuthFacade]
})
export class LayoutModule {}
