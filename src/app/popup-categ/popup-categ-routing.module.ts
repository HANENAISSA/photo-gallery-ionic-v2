import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PopupCategPage } from './popup-categ.page';

const routes: Routes = [
  {
    path: '',
    component: PopupCategPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PopupCategPageRoutingModule {}
