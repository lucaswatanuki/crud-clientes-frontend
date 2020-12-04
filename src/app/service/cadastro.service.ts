import { Cadastro } from './../models/cadastro.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseUrl = environment.api;

  constructor(private http: HttpClient) { }

  signup(info: Cadastro): Observable<Cadastro> {
    return this.http.post<Cadastro>(this.baseUrl + 'signup.php', info);
  }
}
