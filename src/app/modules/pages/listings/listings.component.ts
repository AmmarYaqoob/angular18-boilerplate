import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddeditmembersmodalComponent } from '../modals/addeditmembersmodal/addeditmembersmodal.component';
import { MemberService } from '../../../shared/services/member.service';
import { Member } from '../../../shared/interfaces/member.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent implements OnInit {
  User_ID;
  Members: Array<Member>;
  constructor(
    private modalService: NgbModal,
    private memberService: MemberService,
    private toastService: ToastrService,
  ) { }

  ngOnInit() {
    this.User_ID = localStorage.getItem('User_ID');
    this.Get();
  }

  async Get() {
    // let response = await this.memberService.getbyid(1);
    let response = await this.memberService.get();
    if (response?.Is_Success) {
      this.Members = response.Data;
    }
  }

  async Delete(ID) {
    let response = await this.memberService.delete(ID);
    if (response?.Is_Success) {
      this.toastService.error(response?.Message);
      this.Get();
    }
  }

  async AddEditModal(ID) {
    const options = { windowClass: 'custom-ngb-modal-window', backdropClass: 'custom-ngb-modal-backdrop', User_ID: ID };
    const modalRef = this.modalService.open(AddeditmembersmodalComponent, options);
    modalRef.componentInstance.ID = ID;
    modalRef.componentInstance.modalStatus.subscribe((ModalStatus) => {
      console.log(ModalStatus);
    });
  }
}
