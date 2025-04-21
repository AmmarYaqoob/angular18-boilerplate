import { Component } from '@angular/core';
import { Roles } from '../../../shared/interfaces/roles.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../../../shared/services/roles.service';
import { AddeditrolesComponent } from '../modals/addeditroles/addeditroles.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  Roles: Array<Roles>;

  constructor(
    private modalService: NgbModal,
    private roleService: RolesService,
  ) { }

  ngOnInit() {
    this.Get();
  }

  async Get() {
    let response = await this.roleService.get();
    if (response?.IsSuccess) {
      this.Roles = response.Data;
    }
  }

  async Delete(ID) {
    let result = await Swal.fire({ title: "Are you sure? you want to delete it?", icon: "warning", showDenyButton: false, showCancelButton: true, denyButtonText: `Yes` })
    if (result.isConfirmed) {
      let response = await this.roleService.delete(ID);
      if (response?.IsSuccess) {
        await Swal.fire({ icon: "success", title: "Deleted" })
        this.Get();
      }
    }
  }

  async AddEditModal(ID) {
    const options = { windowClass: 'custom-ngb-modal-window', backdropClass: 'custom-ngb-modal-backdrop', ID: ID };
    const modalRef = this.modalService.open(AddeditrolesComponent, options);
    modalRef.componentInstance.ID = ID;
    modalRef.componentInstance.modalStatus.subscribe((ModalStatus) => {
      this.Get();
    });
  }
}
