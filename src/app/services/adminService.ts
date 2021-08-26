import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Admin} from '../models/Admin';
import * as config from '../config.js';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  endPoint = config.endPoint;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getUsers(): Observable<Admin[]> {
    return this.httpClient.get<Admin[]>(this.endPoint + '/admin/admins');
  }

  registration(username: string, password: string) {
    return this.httpClient.post<any>(this.endPoint + '/admin/registration',
      {username, password});
  }

  login(username: string, password: string) {
    return this.httpClient.post(this.endPoint + '/admin/login', {username, password})
      .pipe(map(admin => {
        sessionStorage.setItem('currentUser', JSON.stringify(admin));
        this.currentUserSubject.next(admin);
        return admin;
      }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
