import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PriceCardComponent } from './components/price-card/price-card.component';
import { AlertCardComponent } from './components/alert-card/alert-card.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CardComponent } from './components/card/card.component';
import { ButttonsComponent } from './components/butttons/butttons.component';
import { ColorsComponent } from './components/colors/colors.component';
import { BordersComponent } from './components/borders/borders.component';
import { TablesComponent } from './components/tables/tables.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PriceCardComponent,
    AlertCardComponent,
    ProgressBarComponent,
    CardComponent,
    TablesComponent,
    ButttonsComponent,
    ColorsComponent,
    BordersComponent
  ],
  exports: [
    PriceCardComponent,
    AlertCardComponent,
    ProgressBarComponent,
    CardComponent,
    TablesComponent,
    ButttonsComponent,
    ColorsComponent,
    BordersComponent
  ]
})
export class SharedModule { }
