import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Weapon} from '../models/Weapon';
import * as config from '../config';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  endPoint = config.endPoint;

  constructor(private httpClient: HttpClient) {
  }

  getWeapons(): Observable<Weapon[]> {
    return this.httpClient.get<Weapon[]>(this.endPoint + '/weapons');
  }

  getWeapon(id: number): Observable<Weapon> {
    return this.httpClient.get<Weapon>(this.endPoint + '/weapons/' + id);
  }

  createWeapon(name: string, type: string, damage: number, pumping_level: number, description: string, image: string) {
    return this.httpClient.post(this.endPoint + '/admin/weapons', {name, type, damage, pumping_level, description, image});
  }

  deleteWeapon(id: number): Observable<Weapon[]> {
    return this.httpClient.delete<Weapon[]>(this.endPoint + '/admin/weapons/' + id);
  }

  updateWeapon(id: number, name: string, type: string, damage: number, pumping_level: number, description: string): Observable<string> {
    return this.httpClient.put<string>(this.endPoint + '/admin/weapons/' + id, {name, type, damage, pumping_level, description});
  }

  uploadImage(formData) {
    return this.httpClient.post(this.endPoint + '/admin/weapons/uploadImage', formData);
  }

}
