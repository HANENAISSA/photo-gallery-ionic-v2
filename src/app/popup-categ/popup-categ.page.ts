
  import { Component, OnInit } from '@angular/core';
  import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popup-categ',
  templateUrl: './popup-categ.page.html',
  styleUrls: ['./popup-categ.page.scss'],
})
export class PopupCategPage implements OnInit {
  Album;
    Albums=['Friends','Work','Study']

    constructor(private pop:PopoverController) { }

    ngOnInit() {
    }

    selectAlbum():void {
      this.pop.dismiss(this.Album);
    }

}
