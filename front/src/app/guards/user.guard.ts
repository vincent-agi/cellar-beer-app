import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly tokenStorage: TokenStorageService
  ) {
  }

  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
      let token = this.tokenStorage.getToken();
    if (token) {
      void this.router.navigate(['/auth', 'login']);
      return false;
    }
    return true;
  }
}