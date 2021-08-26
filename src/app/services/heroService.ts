import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hero} from '../models/Hero';
import * as config from '../config';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  endPoint = config.endPoint;

  constructor(private httpClient: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.endPoint + '/heroes');
  }

  getHero(id: number): Observable<Hero> {
    return this.httpClient.get<Hero>(this.endPoint + '/heroes/' + id);
  }

  createHero(name: string, gender: string, weapon: string, HeroClass: string,
             quality: string, fraction: string, description: string, image: string): Observable<string> {
    return this.httpClient.post<string>(this.endPoint + '/admin/heroes', {name, gender, weapon, class: HeroClass,
                                                                                   quality, fraction, description, image});
  }

  deleteHero(id: number): Observable<Hero[]> {
    return this.httpClient.delete<Hero[]>(this.endPoint + '/admin/heroes/' + id);
  }

  updateHero(id: number, name: string, gender: string, weapon: string, HeroClass: string,
             quality: string, fraction: string, description: string): Observable<string> {
    return this.httpClient.put<string>(this.endPoint + '/admin/heroes/' + id, {name, gender, weapon, class: HeroClass,
                                                                                        quality, fraction, description});
  }

  uploadImage(formData) {
    return this.httpClient.post(this.endPoint + '/admin/heroes/uploadImage', formData);
  }

}
