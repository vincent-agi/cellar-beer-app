import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public version:string = "";

  constructor(private readonly config: ConfigService) {
    this.version = this.config.version
  }

}
