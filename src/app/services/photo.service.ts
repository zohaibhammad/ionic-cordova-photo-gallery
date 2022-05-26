import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: string[] = [];
  private PHOTO_STORAGE: string = 'photos';

  constructor(private camera: Camera, private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.create();
  }

  public set(key: string, value: any) {
    this.storage.set(key, value);
  }

  public async get(key: string) {
    return await this.storage.get(key);
  }

  async addNewToGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    const capturedPhoto = await this.camera.getPicture(options);

    this.photos.unshift('data:image/jpeg;base64,' + capturedPhoto);

    this.set(this.PHOTO_STORAGE, this.photos);
  }

  async loadPhotos() {
    this.photos = [...(await this.storage.get(this.PHOTO_STORAGE))];
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1);
    this.set(this.PHOTO_STORAGE, this.photos);
  }
}
