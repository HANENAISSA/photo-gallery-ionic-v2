import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Photo, PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-categ-photo',
  templateUrl: './categ-photo.page.html',
  styleUrls: ['./categ-photo.page.scss'],
})
export class CategPhotoPage implements OnInit {
  categName: string;
  CategoryList = ['Friends', 'Work', 'Study'];

  constructor(
    private router: ActivatedRoute,
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    this.categName = this.router.snapshot.params.categ.toString();
    await this.photoService.loadSaved();
  }
  addPhotoToGallery() {
    this.photoService.addNewToGallery(this.categName);
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        }
      ],
    });
    await actionSheet.present();
  }
}
