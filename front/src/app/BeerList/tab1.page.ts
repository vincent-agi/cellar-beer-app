import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { ViewDidEnter } from '@ionic/angular';
import { Beer } from '../interfaces/Beer';
import { ConfigService } from '../services/config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, ViewDidEnter {
  public beers: any = [];

  public search:string = "";

  public isFavorite: boolean = false;

  constructor(public beerService: BeerService,private router:Router) {}

  ngOnInit() {
    this.getBeer()
  }
  ionViewDidEnter(): void {
    this.getBeer()
  }
  getBeer(){
    this.beers = this.beerService.getBeerLocalStorage() as any
  }
  
  deleteBeer(id:string){
    if(confirm('Are you sure you want delete this beer')){
      this.beers = this.beers.filter((x:any)=>x.id != id);
      this.beerService.updateBeersLocalStorage(this.beers);
    }
    
  }
  update(id:string){
    this.router.navigate(['add-beer/'+id])
  }


  public filtersByFavorites(): void {
    this.isFavorite = !this.isFavorite;
    if(this.isFavorite) {
      this.beers = this.beers.filter((b: Beer) => b.favorite == true)
    } else {
      this.getBeer();
    }
  }
}
