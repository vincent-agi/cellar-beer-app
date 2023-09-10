import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'src/app/services/storage.service';
import CredentialToken from 'src/app/models/CredentialToken';
import { JWTResponse } from 'src/app/models/JWTResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  protected credential!: CredentialToken | null;

  protected helper: JwtHelperService;

  protected username!: string;

  protected roles: string[] = [];

  protected credentialResponse!: JWTResponse;

  constructor(protected storage: StorageService, private router: Router) {
    this.helper = new JwtHelperService();

    if (this.storage.has('token')) {
      this.credential = new CredentialToken();
      this.credential.token = this.storage.get('token');
      this.decodeToken();
    }
  }

  public removeRoles() {
    this.credential = null;
  }

  public setToken(token: any): void {
    this.storage.set('token', token)
    this.decodeToken();
  }

  public getToken(): null | string {
    if (!this.credential || !this.credential.token) {
      return null;
    }

    return this.credential.token;
  }

  public getTokenCredential(): CredentialToken {
    return this.credential ?? new CredentialToken();
  }

  public isExpired(): boolean {
    if (!this.credential || !this.credential.token) {
      return true;
    }

    return this.helper.isTokenExpired(this.credential.token);
  }

  public removeToken(): void {
    this.credential = null;
    this.storage.remove('token');
  }

  public getUsername(): string {
    return this.username;
  }

  protected decodeToken(): void {
    if (!this.credential || !this.credential.token) {
      return;
    }

    const decode = this.helper.decodeToken(this.credential.token);
    this.username = decode.username;
  }
}