import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)

    // .pipe(
    //   map((event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {
    //         if(event == event.body){
    //           event = event.body.data
    //         }
 
    //       }
    //       return event;
    //   }));
  }
}
