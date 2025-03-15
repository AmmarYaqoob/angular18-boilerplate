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
      Email_Address: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const obj: User = this.loginForm.value;
      let auth = await this.authService.login(obj);
      if (auth?.Is_Success) {
        localStorage.setItem('accessToken', auth?.Data.Token.toString());
        localStorage.setItem('User_ID', auth?.Data.User_ID.toString());
        this.router.navigate(['']);
      } else {
        this.toastService.error(auth?.Message || '');
      }
    }
  }
}
