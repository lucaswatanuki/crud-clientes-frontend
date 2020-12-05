import { Usuario } from './../models/usuario.model';
import { environment } from '../../environments/environment';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  redirectUrl: string;
  baseUrl: string = environment.api;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public login(usuario: Usuario): any {
    console.log(usuario);
    return this.httpClient.post<any>(this.baseUrl + 'login.php', usuario)
      .pipe(map(user => {
        this.setToken(user.username);
        this.getLoggedInName.emit(true);
        return user;
      }));
  }

  public logout(): void {
    this.loggedIn.next(false);
    this.deleteToken();
    window.location.replace(environment.host + 'login');

  }

  isLoggedIn(): boolean {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }
}
