import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseUrl = environment.api;

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<any> {
    return this.http.get<Cliente[]>(this.baseUrl + 'listar_clientes.php');
  }

  cadastrar(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'cadastrar_cliente.php', cliente);
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'atualizar_cliente.php', cliente.id);
  }

  deletar(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'delete.php?id=' + id);
  }
}
