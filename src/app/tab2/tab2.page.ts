import { Component } from '@angular/core';
import { Photo, PhotoService } from '../services/photo.service';

import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  //
  //localSPhoto : string
  CategoryList = ['Friends', 'Work', 'Study'];

  // constructor(public photoService: PhotoService,
  //   public actionSheetController: ActionSheetController) { }

  constructor(private alertController: AlertController) {}
  async ngOnInit() {
    // await this.photoService.loadSaved();
    // this.localSPhoto = JSON.parse(localStorage.getItem('_cap_photos')).Cat
  }

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
              this.CategoryList.push(res.CategoryName)
              console.log('res :', res.CategoryName);
            },
          },
        ],
      })
      .then((res) => res.present());
  }
  // addPhotoToGallery() {
  //   this.photoService.addNewToGallery();
  // }

  // public async showActionSheet(photo: Photo, position: number) {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Photos',
  //     buttons: [{
  //       text: 'Delete',
  //       role: 'destructive',
  //       icon: 'trash',
  //       handler: () => {
  //         this.photoService.deletePicture(photo, position);
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         // Nothing to do, action sheet is automatically closed
  //         }
  //     },{
  //       text: 'Add to Folder',
  //       icon: 'add',
  //       role: 'add',
  //       handler: () =>{
  //         // nothing for now
  //         this.CategoryList.push("Fun")
  //       }
  //     }
  //   ]
  //   });
  //   await actionSheet.present();
  // }
}
