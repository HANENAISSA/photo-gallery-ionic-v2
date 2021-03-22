import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PopupCategPageRoutingModule } from './popup-categ-routing.module';

import { PopupCategPage } from './popup-categ.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PopupCategPageRoutingModule
  ],
  declarations: [PopupCategPage]
})
export class PopupCategPageModule {}
