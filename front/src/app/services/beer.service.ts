import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Beer } from "../interfaces/Beer"
import { Observable } from 'rxjs';
import { AbstractRequestService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class BeerService extends AbstractRequestService {

  public totalitarBeer: Beer = {
    id: '1',
    filepath: '',
    webviewPath: 'https://images.punkapi.com/v2/keg.png',
    name: "TotalitarBeer",
    mark: 5,
    comments: "Commentaire sur totalitarBeer"    
  };

  public beralAged: Beer = {
    id: '2',
    filepath: '',
    webviewPath: 'https://images.punkapi.com/v2/217.png',
    name: "Barel Aged",
    mark: 4,
    comments: 'Super beer'
  }

  public beers: Beer[] = [
    this.totalitarBeer,
    this.beralAged
  ];


  public async addNewToGallery(name:string, mark:number, comments?:string) {
  // Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
    });
    const savedImageFile = await this.savePicture(capturedPhoto, name, mark, comments);
    this.beers.unshift(savedImageFile);
  }

  private async savePicture(photo: any, name:string, mark:number, comments?:string) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);
  
    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
  
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
      name: name,
      mark: mark,
      comments: comments
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public getBeerById(id:string): Observable<Beer> {
    return this.http.get<Beer>(`${this.apiUrl}/beers/${id}`)
  }

  public getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.apiUrl}/beers`)
  }
}
