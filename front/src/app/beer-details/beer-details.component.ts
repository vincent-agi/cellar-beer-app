import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeerService } from '../services/beer.service';
import { Beer } from '../interfaces/Beer';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.scss'],
})
export class BeerDetailsComponent  implements OnInit {

  public beer!: Beer | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly beerService: BeerService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']) {
        this.beer = this.beerService.getBeerById(params['id'])
      }
    })
  }

}
