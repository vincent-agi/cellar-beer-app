import { Injectable } from '@angular/core';
import { AbstractRequestService } from './abstract.service';
import { Observable } from 'rxjs';
import RegisterModel from '../models/registerModel';
import LoginModel from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractRequestService {

  public register(registerModel: RegisterModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/register`, registerModel);
  }

  public login(loginModel: LoginModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/login`, loginModel);
  }

}