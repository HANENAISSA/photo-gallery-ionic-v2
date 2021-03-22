import { Component } from '@angular/core';
import { Photo, PhotoService } from '../services/photo.service';

import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page {
  CategoryList = ['Friends', 'Work', 'Study'];

  constructor(private alertController: AlertController) {}
  async ngOnInit() {}

  async showAlert() {
    await this.alertController
      .create({
        header: 'Add Category',
        message: 'fill the field below to add a new category',
        inputs: [
          {
            type: 'text',
            name: 'CategoryName',
            placeholder: 'Category Name',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Apply',
            handler: (res) => {
              this.CategoryList.push(res.CategoryName);
              console.log('res :', res.CategoryName);
            },
          },
        ],
      })
      .then((res) => res.present());
  }
}
