import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categ-photo',
  templateUrl: './categ-photo.page.html',
  styleUrls: ['./categ-photo.page.scss'],
})
export class CategPhotoPage implements OnInit {

  categName: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.categName = this.router.snapshot.params.categ.toString();
  }

}
