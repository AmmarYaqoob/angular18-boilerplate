import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddeditmembersmodalComponent } from '../modals/addeditmembersmodal/addeditmembersmodal.component';
import { UserService } from '../../../shared/services/users.service';
import { User } from '../../../shared/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent implements OnInit {
  ID;
  Members: Array<User>;
  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.ID = localStorage.getItem('ID');
    this.Get();
  }

  async Get() {
    let response = await this.userService.get();
    if (response?.IsSuccess) {
      this.Members = response.Data;
    }
  }

  async Delete(ID) {
    let result = await Swal.fire({ title: "Are you sure? you want to delete it?", icon: "warning", showDenyButton: false, showCancelButton: true, denyButtonText: `Yes` })
    if (result.isConfirmed) {
      let response = await this.userService.delete(ID);
      if (response?.IsSuccess) {
        await Swal.fire({ icon: "success", title: "Deleted" })
        this.Get();
      }
    }
  }

  async AddEditModal(ID) {
    const options = { windowClass: 'custom-ngb-modal-window', backdropClass: 'custom-ngb-modal-backdrop', ID: ID };
    const modalRef = this.modalService.open(AddeditmembersmodalComponent, options);
    modalRef.componentInstance.ID = ID;
    modalRef.componentInstance.modalStatus.subscribe((ModalStatus) => {
      this.Get();
    });
  }
}
