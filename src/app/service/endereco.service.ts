import { Endereco } from './../models/endereco.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  baseUrl = environment.api;

  constructor(private http: HttpClient) { }

  consultar(id: number): Observable<any> {
    return this.http.get<Endereco[]>(this.baseUrl + 'consultar_endereco.php?id=' + id);
  }

  deletar(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'deletar_endereco.php?id=' + id);
  }

  atualizar(endereco: Endereco): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'atualizar_endereco.php', endereco);
  }

  salvar(endereco: Endereco): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'endereco.php', endereco);
  }
}
