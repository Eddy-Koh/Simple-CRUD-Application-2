// prevent logged-in users from accessing login or registration pages
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      alert('You are already logged in.');
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
