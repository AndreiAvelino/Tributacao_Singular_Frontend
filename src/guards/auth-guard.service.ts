import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from 'src/consts/routes';
import { LocalStorageService } from 'src/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _localStorage: LocalStorageService,
              private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): boolean  
              
  {
    if(this._localStorage.get("user"))
      return true

    this._router.navigate(([`${routes.LOGIN}`]))
    return false
    
  }
}
