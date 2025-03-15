import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('accessToken')) {
      return true;
      // logged in so return true
      if (localStorage.getItem('accessToken') != "404") {
        return true;
      }
    }

    this.router.navigateByUrl('/auth', { replaceUrl: true });
    return false;
  }
}