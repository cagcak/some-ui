import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule, STORAGE_ENGINE } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '@shared';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components';
import { LocalStorageService } from './services';
import { SessionState, SomeAppState } from './store';

function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxsRouterPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: SessionState }),
    NgxsModule.forRoot([SomeAppState], {
      developmentMode: !environment.production,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en-US',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: STORAGE_ENGINE,
      useClass: LocalStorageService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
