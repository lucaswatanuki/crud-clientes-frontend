import { ClienteDialogueComponent } from './cliente-dialogue/cliente-dialogue.component';
import { ClienteService } from './../../service/cliente.service';
import { Cliente } from './../../models/cliente.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteUpdateDiolgueComponent } from './cliente-update-diolgue/cliente-update-diolgue.component';
import { DatePipe } from '@angular/common';
import { ConfirmacaoDialogueComponent } from 'src/app/shared/confirmacao-dialogue/confirmacao-dialogue.component';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [DatePipe]
})
export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();
  clientes: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nome', 'rg', 'cpf', 'telefone', 'dataNascimento', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  confirmacaoDialogueRef: MatDialogRef<ConfirmacaoDialogueComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(private clienteService: ClienteService, public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

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
        this.openSnackBar('Cliente excluído com sucesso', 'OK');
        this.getClientes();
      }
    );
  }

  openDialog(element): void {
    if (element === null) {
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
    } else {
      const dialogRef = this.dialog.open(ClienteUpdateDiolgueComponent, {
        width: '50%',
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

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: this.horizontalPosition
    });
  }

}
