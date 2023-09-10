import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private readonly tokenStorageService: TokenStorageService,
    private readonly router: Router
  ) {}

  public logout(): void {
    this.tokenStorageService.removeToken();
    this.router.navigateByUrl('/auth/login');
  }

}
