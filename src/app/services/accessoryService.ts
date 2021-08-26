import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Accessory} from '../models/Accessory';
import * as config from '../config';


@Injectable({
  providedIn: 'root'
})
export class AccessoryService {
  endPoint = config.endPoint;

  constructor(private httpClient: HttpClient) {
  }

  getAccessories(): Observable<Accessory[]> {
    return this.httpClient.get<Accessory[]>(this.endPoint + '/accessories');
  }

  getAccessory(id: number): Observable<Accessory> {
    return this.httpClient.get<Accessory>(this.endPoint + '/accessories/' + id);
  }

  createAccessory(name: string, description: string, image: string) {
    return this.httpClient.post(this.endPoint + '/admin/accessories', {name, description, image});
  }

  deleteAccessory(id: number): Observable<Accessory[]> {
    return this.httpClient.delete<Accessory[]>(this.endPoint + '/admin/accessories/' + id);
  }

  updateAccessory(id: number, name: string, description: string): Observable<string> {
    return this.httpClient.put<string>(this.endPoint + '/admin/accessories/' + id, {name, description});
  }

  uploadImage(formData) {
    return this.httpClient.post(this.endPoint + '/admin/accessories/uploadImage', formData);
  }

}
