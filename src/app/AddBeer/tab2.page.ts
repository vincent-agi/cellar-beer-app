import { Component } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public beerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    mark : new FormControl('', Validators.required),
    comments: new FormControl('')
  })

  constructor(
    public beerService:BeerService,
    private readonly router: Router
  ) {}

  addPhotoToGallery() {
    let name = this.beerForm.get('name')?.value;
    let mark = this.beerForm.get('mark')?.value;
    let comments = this.beerForm.get('comments')?.value;
    this.beerService.addNewToGallery(name, mark, comments);
    this.router.navigateByUrl('/');
  }

}
