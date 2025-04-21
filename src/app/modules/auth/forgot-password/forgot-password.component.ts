import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  submitted: boolean = false;
  form = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {
  }

  async Submit() {
    this.submitted = !this.submitted;
    if (this.form.valid) {
      let auth = await this.authService.ForgetPassword(this.form.value.Email);
      if (auth?.IsSuccess) {
        await Swal.fire({ icon: "success", title: "We have sent you a reset link to update your password. Kindly check your Email." })
      } else {
        this.toastService.error(auth?.Message || '');
      }
    }
  }
}
