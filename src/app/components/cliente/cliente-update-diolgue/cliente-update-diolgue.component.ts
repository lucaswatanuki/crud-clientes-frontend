import { Cliente } from './../../../models/cliente.model';
import { element } from 'protractor';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnderecoService } from './../../../service/endereco.service';
import { Endereco } from './../../../models/endereco.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { EnderecoUpdateDiolgueComponent } from '../endereco-update-diolgue/endereco-update-diolgue.component';

@Component({
  selector: 'app-cliente-update-diolgue',
  templateUrl: './cliente-update-diolgue.component.html',
  styleUrls: ['./cliente-update-diolgue.component.scss']
})
export class ClienteUpdateDiolgueComponent implements OnInit {

  cliente: Cliente = new Cliente();
  endereco: Endereco = new Endereco();
  enderecos: MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'cep', 'cidade', 'estado', 'action'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  formularioCliente: FormGroup;


  constructor(private fbuilder: FormBuilder, private enderecoService: EnderecoService, @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ClienteUpdateDiolgueComponent>, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.data.element) {
      this.cliente = this.data.element;
      this.getEnderecos(this.cliente.id);
    }

    this.formularioCliente = this.fbuilder.group({
      nome: new FormControl('', Validators.required),
      rg: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
    });
  }

  public getEnderecos(id: number): void {
    this.enderecoService.consultar(id).subscribe(
      data => {
        this.enderecos = new MatTableDataSource(data);
        this.enderecos.paginator = this.paginator;
      },
      erro => {
        console.log(erro);
      }
    );
  }

  deletar(endereco: Endereco): void {
    this.enderecoService.deletar(this.cliente.id).subscribe(
      data => {
        this.getEnderecos(this.cliente.id);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(EnderecoUpdateDiolgueComponent, {
      width: 'auto',
      data: {
        element
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getEnderecos(this.cliente.id);
      }
    );
  }

}
