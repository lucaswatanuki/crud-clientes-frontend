import { element } from 'protractor';
import { ConfirmacaoDialogueComponent } from './../../../shared/confirmacao-dialogue/confirmacao-dialogue.component';
import { EnderecoService } from './../../../service/endereco.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Endereco } from 'src/app/models/endereco.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-endereco-update-diolgue',
  templateUrl: './endereco-update-diolgue.component.html',
  styleUrls: ['./endereco-update-diolgue.component.scss']
})
export class EnderecoUpdateDiolgueComponent implements OnInit {
  endereco: Endereco = new Endereco();
  formularioEndereco: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  estados = [
    {nome: 'São Paulo', sigla: 'SP'},
    {nome: 'Rio Grande do Sul', sigla: 'RS'},
    {nome: 'Rio de Janeiro', sigla: 'RJ'},
    {nome: 'Minas Gerais', sigla: 'MG'},
    {nome: 'Pernambuco', sigla: 'PE'},
    {nome: 'Rio Grande do Norte', sigla: 'RN'},
  ];

  constructor(private enderecoService: EnderecoService, private fbuilder: FormBuilder,
    public dialogRef: MatDialogRef<EnderecoUpdateDiolgueComponent>, @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar, private toast: ToastrService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data.element);
    if (this.data.element) {
      this.endereco = this.data.element;
    }

    this.formularioEndereco = this.fbuilder.group({
      nome: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      cep: new FormControl('', Validators.required),
      cidade: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
    });

  }

  update(endereco: Endereco): void {
    this.enderecoService.atualizar(endereco).subscribe(
      data => {
        this.openSnackBar('Endereço atualizado!', 'OK');
        this.dialogRef.close();
      },
      error => {
        this.toast.error('Erro ao atualizar endereço', 'Erro');
        console.log(error);
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {
      duration: 15000,
      horizontalPosition: this.horizontalPosition
    });
  }

  salvar(endereco: Endereco): void {
    endereco.clienteId = this.data.id;
    console.log(endereco);
    this.enderecoService.salvar(endereco).subscribe(
      data => {
        this.openSnackBar('Endereço salvo com sucesso!', 'OK');
        this.dialogRef.close();
      },
      error => {
        this.toast.error('Erro ao salvar endereço', 'Erro');
        console.log(error);
      }
    );
  }

}
