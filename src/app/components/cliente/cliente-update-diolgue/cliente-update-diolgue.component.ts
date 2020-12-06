import { ConfirmacaoDialogueComponent } from './../../../shared/confirmacao-dialogue/confirmacao-dialogue.component';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from './../../../service/cliente.service';
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
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

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
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  confirmacaoDialogueRef: MatDialogRef<ConfirmacaoDialogueComponent>;

  public cpfMascara = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public rgMascara = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/];
  public telefoneMascara = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  constructor(private fbuilder: FormBuilder, private enderecoService: EnderecoService, @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ClienteUpdateDiolgueComponent>, public dialog: MatDialog, private snackBar: MatSnackBar,
    private clienteService: ClienteService, private toast: ToastrService) { }

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
        this.toast.error('Erro ao listar endereços', 'Erro');
        console.log(erro);
      }
    );
  }

  deletarEndereco(endereco: Endereco): void {
    this.enderecoService.deletar(endereco.id).subscribe(
      data => {
        this.openSnackBar('Endereço excluído com sucesso.', 'OK');
        this.getEnderecos(this.cliente.id);
      }
    );
  }

  updateCliente(cliente: Cliente): void {
    this.clienteService.atualizar(cliente).subscribe(
      data => {
        this.openSnackBar('Cliente atualizado com sucesso.', 'OK');
        this.dialogRef.close();
      },
      error => {
        this.toast.error('Erro ao atualizar dados do cliente', 'Erro');
        console.log(error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(element: any, id: number): void {
    const dialogRef = this.dialog.open(EnderecoUpdateDiolgueComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        element,
        id
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getEnderecos(this.cliente.id);
      }
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition
    });
  }


  openConfirmationDialog(endereco: Endereco) {
    this.confirmacaoDialogueRef = this.dialog.open(ConfirmacaoDialogueComponent, {
      disableClose: false
    });
    this.confirmacaoDialogueRef.componentInstance.mensagem = 'Deseja excluir o endereço?';

    this.confirmacaoDialogueRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletarEndereco(endereco);
      }
      this.dialogRef = null;
    });
  }

}
