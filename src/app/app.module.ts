import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestsInterceptor } from 'src/interceptor/requests.interceptor';
import { ResponseInterceptor } from 'src/interceptor/response.interceptor';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    PagesModule,
    LoginModule,
    PagesRoutingModule,
    RouterModule,
    // ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: RequestsInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
