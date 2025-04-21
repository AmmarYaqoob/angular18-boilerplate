import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.user = localStorage.getItem('ID');
  }

  async Logout() {
    await this.authService.Logout(this.user);
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
