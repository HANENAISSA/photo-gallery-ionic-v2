import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategPhotoPageRoutingModule } from './categ-photo-routing.module';

import { CategPhotoPage } from './categ-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategPhotoPageRoutingModule
  ],
  declarations: [CategPhotoPage]
})
export class CategPhotoPageModule {}
