import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { TablesComponent } from '../../shared/components/tables/tables.component';
import { BordersComponent } from '../../shared/components/borders/borders.component';
import { ButttonsComponent } from '../../shared/components/butttons/butttons.component';
import { ColorsComponent } from '../../shared/components/colors/colors.component';
import { ListingsComponent } from './listings/listings.component';
import { LargeimageviewComponent } from './largeimageview/largeimageview.component';

const routes: Routes = [
  {
    path: 'largeimage/:id',
    component: LargeimageviewComponent,
  },
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'listings',
        component: ListingsComponent,
      },
      {
        path: 'borders',
        component: BordersComponent,
      },
      {
        path: 'buttons',
        component: ButttonsComponent,
      },
      {
        path: 'colors',
        component: ColorsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
  static components = [
    HomeComponent,
  ];
}
