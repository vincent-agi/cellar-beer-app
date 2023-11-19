import { Component, OnInit } from '@angular/core';
import { BeerService } from '../services/beer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, ViewDidEnter {
  public beers: any = [];

  constructor(public beerService: BeerService,private router:Router,private route: ActivatedRoute) {
  }

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
}
