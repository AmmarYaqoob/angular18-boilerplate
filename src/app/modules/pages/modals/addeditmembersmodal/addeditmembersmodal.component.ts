import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../../../shared/services/roles.service';
import { Roles } from '../../../../shared/interfaces/roles.interface';
import { UserService } from '../../../../shared/services/users.service';
import { User } from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-addeditmembersmodal',
  templateUrl: './addeditmembersmodal.component.html',
  styleUrls: ['./addeditmembersmodal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddeditmembersmodalComponent implements OnInit {
  @Output() modalStatus: EventEmitter<any> = new EventEmitter();
  @Input() ID: number;
  form: FormGroup;
  submitted: boolean = false;
  roles: Array<Roles>;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private roleService: RolesService,
    private toastService: ToastrService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      UserName: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    if (this.ID) {
      this.Get(this.ID);
    }
  }

  async Get(ID: number) {
    let response = await this.userService.getbyid(ID);
    if (response?.IsSuccess) {
      this.form = this.fb.group({
        ID: response.Data.ID,
        UserName: response.Data.UserName,
        Email: response.Data.Email,
      });
    }
  }

  async Submit() {
    this.submitted = !this.submitted;
    if (this.form.valid) {
      const obj: User = this.form.value;
      let response;
      if (this.ID) {
        response = await this.userService.update(obj);
      } else {
        response = await this.userService.add(obj);
      }
      if (response?.IsSuccess) {
        this.toastService.success(response?.Message || '');
        this.modalStatus.emit('Modal Closes');
        this.activeModal.dismiss();
      } else {
        this.toastService.info(response?.Message || '', 'Info');
      }
    }
  }

  async GetRoles() {
    let response = await this.roleService.get();
    if (response?.IsSuccess) {
      this.roles = response.Data;
    }
  }
}
