import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/interfaces/user.interface';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submitted: boolean = false;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastrService
  ) {
  }

  registerForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Email_Address: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    RepeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, { validators: this.MatchPassword })

  MatchPassword(formGroup: FormGroup) {
    const { Password, RepeatPassword } = formGroup.value;
    if (Password == RepeatPassword) {
      return null;
    };
    return { passwordNotMatched: true };
  }

  async Submit() {
    this.submitted = !this.submitted;
    if (this.registerForm.valid) {
      const { RepeatPassword, ...formData } = this.registerForm.value;
      const user = formData as User;
      let auth = await this.authService.signup(user);
      if (auth?.Is_Success) {
        this.router.navigate(['/auth/login']);
      } else {
        this.toastService.error(auth?.Message || '');
      }
    }
  }
}
