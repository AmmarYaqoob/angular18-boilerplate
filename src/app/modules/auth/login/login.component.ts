import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const obj: User = this.loginForm.value;
      let auth = await this.authService.Login(obj);
      if (auth?.IsSuccess) {
        localStorage.setItem('accessToken', auth?.Data.Token.toString());
        localStorage.setItem('ID', auth?.Data.ID.toString());
        this.router.navigate(['']);
      } else {
        this.toastService.error(auth?.Message || '');
      }
    }
  }
}
