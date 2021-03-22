import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategPhotoPage } from './categ-photo.page';

const routes: Routes = [
  {
    path: '',
    component: CategPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategPhotoPageRoutingModule {}
