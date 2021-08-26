import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/adminService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private adminService: AdminService,
              private router: Router) {
    adminService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
