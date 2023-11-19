import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Beer } from "../interfaces/Beer"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {
  allBears: Beer[] = [];
  beers: any;

  public async addNewToGallery(name:string, mark:number, comments?:string) {
  // Take a photo
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
    });
    const savedImageFile = await this.savePicture(capturedPhoto, name, mark, comments);
    this.beers.unshift(savedImageFile);
    this.createBeerByLS(savedImageFile)
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

  public getBeerLocalStorage(id?:any) {
    let beer = [] as any
    beer = localStorage.getItem('Beers');
    this.allBears = beer ? JSON.parse(beer) : [];
    if(!id) return this.allBears;
    else return this.allBears.find(x=>x.id == id);
  }
  
  
  public createBeerByLS(beer: any){
    if(!this.allBears) this.allBears = []
    this.allBears.push(beer);
    this.updateBeersLocalStorage(this.allBears)
  }
  public updateBeersLocalStorage(beers: any) {
    const beersJson = JSON.stringify(beers);
    localStorage.removeItem('Beers')
    localStorage.setItem('Beers', beersJson);
  }
  public updateBeerLocalStorage(beer: any) {
    let index = this.allBears.findIndex(x=>x.id == beer.id);
    this.allBears[index] = beer;
    this.updateBeersLocalStorage(this.allBears)
  }
}
