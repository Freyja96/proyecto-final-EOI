import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  public uploadImage(name: string, data: any) {
    return this.storage.upload(name, data);
  }

  public getRefImage(name: string) {
    return this.storage.ref(name);
  }

  public deleteImage(url: any) {
    return this.storage.refFromURL(url).delete();
  }
}
