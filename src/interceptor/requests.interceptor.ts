import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/services/local-storage.service';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  constructor(private _localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const user = this._localStorage.get("user")

    if (user) {

      console.log(user.accessToken)

      request = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + user.accessToken)
      });

      return next.handle(request)

 
    }else {
      return next.handle(request);
    }
   
  }
}
