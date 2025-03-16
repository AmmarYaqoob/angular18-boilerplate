import { Component } from '@angular/core';
import { Roles } from '../../../shared/interfaces/roles.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RolesService } from '../../../shared/services/roles.service';
import { AddeditrolesComponent } from '../modals/addeditroles/addeditroles.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  Roles: Array<Roles>;

  constructor(
    private modalService: NgbModal,
    private memberService: RolesService,
    private toastService: ToastrService,
  ) { }

  ngOnInit() {
    this.Get();
  }

  async Get() {
    let response = await this.memberService.get();
    if (response?.Is_Success) {
      this.Roles = response.Data;
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
    const options = { windowClass: 'custom-ngb-modal-window', backdropClass: 'custom-ngb-modal-backdrop', ID: ID };
    const modalRef = this.modalService.open(AddeditrolesComponent, options);
    modalRef.componentInstance.ID = ID;
    modalRef.componentInstance.modalStatus.subscribe((ModalStatus) => {
      this.Get();
    });
  }
}
