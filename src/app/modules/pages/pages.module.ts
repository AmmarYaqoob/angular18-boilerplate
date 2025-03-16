import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../../shared/header/header/header.component';
import { NavbarComponent } from '../../shared/header/navbar/navbar.component';
import { SharedModule } from '../../shared/shared.module';
import { ListingsComponent } from './listings/listings.component';
import { AddeditmembersmodalComponent } from './modals/addeditmembersmodal/addeditmembersmodal.component';
import { RolesComponent } from './roles/roles.component';
import { AddeditrolesComponent } from './modals/addeditroles/addeditroles.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    NavbarComponent,
    PagesComponent,
    HomeComponent,
    ListingsComponent,
    RolesComponent,
    AddeditmembersmodalComponent,
    AddeditrolesComponent
  ],
})
export class PagesModule { }
