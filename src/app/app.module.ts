import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es_CO from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { INITIAL_STATE, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { TRANSLATE_CONFIG } from '@core/configs/translate.config';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { APP_REDUCER } from '@state/app.reducer';
import { INITIAL_APP_STATE } from '@state/app.state';

registerLocaleData(es_CO);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(TRANSLATE_CONFIG),
    StoreModule.forRoot(APP_REDUCER),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    {
      provide: INITIAL_STATE,
      useValue: INITIAL_APP_STATE
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
