import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Member } from '../../../../shared/interfaces/member.interface';
import { MemberService } from '../../../../shared/services/member.service';

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
    private memberService: MemberService,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.fb.group({
      Username: ['', [Validators.required]],
      Email_Address: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.ID) {
      this.Get(this.ID);
    }
  }

  async Get(ID: number) {
    let response = await this.memberService.getbyid(ID);
    if (response?.Is_Success) {
      this.form = this.formBuilder.group({
        Username: response.Data.Username,
        Email_Address: response.Data.Email_Address,
        Password: response.Data.Password,
      });
    }
  }

  async Submit() {
    this.submitted = !this.submitted;
    if (this.form.valid) {
      const obj: Member = this.form.value;
      let response;
      if (this.ID) {
        response = await this.memberService.update(obj);
      } else {
        response = await this.memberService.add(obj);
      }
      if (response?.Is_Success) {
        this.toastService.error(response?.Message || '');
        this.modalStatus.emit('Modal Closes');
        this.activeModal.dismiss();
      }
    }
  }
}
