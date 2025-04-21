import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Roles } from '../../../../shared/interfaces/roles.interface';
import { RolesService } from '../../../../shared/services/roles.service';

@Component({
  selector: 'app-addeditroles',
  templateUrl: './addeditroles.component.html',
  styleUrl: './addeditroles.component.css'
})
export class AddeditrolesComponent implements OnInit {
  @Output() modalStatus: EventEmitter<any> = new EventEmitter();
  @Input() ID: number;
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private roleService: RolesService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      ID: [this.ID],
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
    let response = await this.roleService.getbyid(ID);
    if (response?.IsSuccess) {
      this.form = this.formBuilder.group({
        Name: response.Data.Name,
        Description: response.Data.Description,
      });
    }
  }

  async Submit() {
    this.submitted = !this.submitted;
    if (this.form.valid) {
      const obj: Roles = this.form.value;
      let response;
      if (this.ID) {
        this.form.value.ID = this.ID;
        response = await this.roleService.update(obj);
      } else {
        response = await this.roleService.add(obj);
      }
      if (response?.IsSuccess) {
        this.toastService.success(response?.Message || '');
        this.modalStatus.emit('Modal Closes');
        this.activeModal.dismiss();
        return;
      }
      this.modalStatus.emit(response.Message);
    }
  }
}
