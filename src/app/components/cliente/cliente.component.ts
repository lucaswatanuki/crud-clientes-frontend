import { ClienteDialogueComponent } from './cliente-dialogue/cliente-dialogue.component';
import { ClienteService } from './../../service/cliente.service';
import { Cliente } from './../../models/cliente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  clientes: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nome', 'rg', 'cpf', 'telefone', 'dataNascimento', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private clienteService: ClienteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getClientes();
  }

  applyFilter(value: string): void {
    this.clientes.filter = value.trim().toLowerCase();
  }

  public getClientes(): void {
    this.clienteService.listarClientes().subscribe(
      data => {
        this.clientes = new MatTableDataSource(data);
        this.clientes.paginator = this.paginator;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  deletar(cliente: Cliente): void {
    this.clienteService.deletar(cliente.id).subscribe(
      data => {
        this.getClientes();
      }
    );
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ClienteDialogueComponent, {
      width: 'auto',
      data: {
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getClientes();
      }
    );
  }

}
