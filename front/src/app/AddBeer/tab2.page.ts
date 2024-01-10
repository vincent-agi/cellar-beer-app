import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef;
  beerId!:any;
  edit_view:boolean = false;
  selectedFile:any;
  imageURL:any;
  public beerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    mark : new FormControl('', Validators.required),
    comments: new FormControl(''),
    favorite: new FormControl(''),
    image: new FormControl(''),
  })
  constructor(
    public beerService:BeerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.getData()
  }
  ionViewDidEnter(): void {
    this.getData()
  }
  getData(){
    const id = this.route.snapshot.paramMap.get('id');
    this.beerId = id
    if(id && id!=null){
      this.edit_view = true;
      let data:any = this.beerService.getBeerLocalStorage(id);
      if(data){
        this.beerForm.get('name')?.setValue(data.name);
        this.beerForm.get('mark')?.setValue(data.mark);
        this.beerForm.get('favorite')?.setValue(data.isFavorite);
        this.beerForm.get('comments')?.setValue(data.description);
        this.beerForm.get('image')?.setValue(data.image);
        this.imageURL = data.image
      }
    }
  }
  onSubmit() {
    if (this.beerForm.valid) {
      const name = this.beerForm.get('name')?.value;
      const mark = this.beerForm.get('mark')?.value;
      const comments = this.beerForm.get('comments')?.value;
      const isFavorite = this.beerForm.get('favorite')?.value;
  
      if (this.imageURL) {
        // Handle the image if a new one is selected
          // Create a Beer object
          const beer = {
            id: this.beerId ? this.beerId : Date.now(),
            name: name,
            mark: mark,
            description: comments,
            favorite: isFavorite,
            image: this.imageURL
          };
  
          if (this.edit_view) {
            this.beerService.updateBeerLocalStorage(beer);
            this.beerService.getBeerLocalStorage(); 
          } else {
            this.beerService.createBeerByLS(beer);
          }
          this.router.navigate(['/'])
          this.beerForm.reset();
      } 
    } else {
      console.log('No file selected.');
    }
  }
  onImageUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      // You can handle the uploaded file here, e.g., send it to a server or display it.
      const newImage = inputElement.files[0];
      // Update imageURL with the new image URL or perform other actions.
      // For example, you can display the new image using a FileReader.
      const reader = new FileReader();
      reader.onload = (e:any) => {
        this.imageURL = e.target.result as string;
      };
      reader.readAsDataURL(newImage);
    }
  }
}
