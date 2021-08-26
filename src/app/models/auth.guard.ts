import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AdminService } from '../services/adminService';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.adminService.currentUserValue;
    if (currentUser) {
      return true;
    }

    this.router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
