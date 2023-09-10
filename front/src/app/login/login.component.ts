import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import LoginModel from '../models/loginModel';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPage implements OnInit{
  public email: string = '';
  public password: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly tokenStorageService: TokenStorageService,
    private readonly router : Router
  ) {}

  public ngOnInit(): void {
   let token = this.tokenStorageService.getToken();
   if(token) {
    this.router.navigateByUrl('/');
   }
  }

  login() {
    let loginModel: LoginModel = new LoginModel();
    loginModel.email = this.email;
    loginModel.password = this.password;
    this.authService.login(loginModel).subscribe((response) => {
      this.tokenStorageService.setToken(response.token);
      this.router.navigateByUrl('/')
    })
  }
}