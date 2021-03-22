import { Injectable } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from '@capacitor/core';
import { Platform, PopoverController } from '@ionic/angular';
//import { PopupCategPage } from '../popup-categ/popup-categ.page';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;

  constructor(
    platform: Platform,
    private popoverController: PopoverController
  ) {
    this.platform = platform;
  }

  /*async showpop() {
    const popover = await this.popoverController.create({
      component: PopupCategPage,
      cssClass: 'my-custom-class',
      translucent: true,
    });
    popover.onDidDismiss().then(async (data) => {
      this.savedImageFile = await this.savePicture(
        this.capturedPhoto,
        data['data']
      );
      this.photos.unshift(this.savedImageFile);

      Storage.set({
        key: this.PHOTO_STORAGE,
        value: JSON.stringify(this.photos),
      });
    });

    return await popover.present();
  }*/
  savedImageFile;
  capturedPhoto;
  public async addNewToGallery() {
    // Take a photo
    try {
      this.capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      // Save the picture and add it to photo collection

      //this.showpop();
    } catch (error) {
      console.log('No Photo taken');
    }
  }

  // Save picture to file on device
  private async savePicture(cameraPhoto: CameraPhoto, cat) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data,
    });

    /*var photoInfo = {fileName :fileName, categorie: 'work'}
    console.log('File name : ',fileName)
    localStorage.setItem('photo',JSON.stringify(photoInfo))*/

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        Cat: cat,
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath,
        Cat: cat,
      };
    }
  }
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: cameraPhoto.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.Data,
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  public async deletePicture(photo: Photo, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data,
    });
  }
}

export interface Photo {
  filepath: string;
  webviewPath: string;
  Cat: string;
}
