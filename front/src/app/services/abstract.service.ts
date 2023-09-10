import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractRequestService {
  protected apiUrl = environment.apiUrl;

  protected fcs = `${this.apiUrl}`;

  protected constructor(
    protected readonly http: HttpClient,
  ) { }
}