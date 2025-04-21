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
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      Name: ['', [Validators.required]],
      Description: ['', [Validators.required]],
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
      this.form = this.formBuilder.group({
        ID: response.Data.ID,
        Username: response.Data.Username,
        Email: response.Data.Email,
        Password: response.Data.Password,
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
