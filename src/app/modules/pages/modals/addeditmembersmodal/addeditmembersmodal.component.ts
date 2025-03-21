import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../../../shared/services/roles.service';
import { Roles } from '../../../../shared/interfaces/roles.interface';

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

  constructor(
    public activeModal: NgbActiveModal,
    private roleService: RolesService,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
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
    let response = await this.roleService.getbyid(ID);
    if (response?.Is_Success) {
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
        response = await this.roleService.update(obj);
      } else {
        response = await this.roleService.add(obj);
      }
      if (response?.Is_Success) {
        this.toastService.error(response?.Message || '');
        this.modalStatus.emit('Modal Closes');
        this.activeModal.dismiss();
      }
    }
  }
}
