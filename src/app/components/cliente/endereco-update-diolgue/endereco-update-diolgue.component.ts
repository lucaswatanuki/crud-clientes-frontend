import { EnderecoService } from './../../../service/endereco.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Endereco } from 'src/app/models/endereco.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-endereco-update-diolgue',
  templateUrl: './endereco-update-diolgue.component.html',
  styleUrls: ['./endereco-update-diolgue.component.scss']
})
export class EnderecoUpdateDiolgueComponent implements OnInit {

  endereco: Endereco = new Endereco();
  formularioEndereco: FormGroup;

  estados = [
    {nome: 'São Paulo', sigla: 'SP'},
    {nome: 'Rio Grande do Sul', sigla: 'RS'},
    {nome: 'Rio de Janeiro', sigla: 'RJ'},
    {nome: 'Minas Gerais', sigla: 'MG'},
    {nome: 'Pernambuco', sigla: 'PE'},
    {nome: 'Rio Grande do Norte', sigla: 'RN'},
  ];

  constructor(private enderecoService: EnderecoService, private fbuilder: FormBuilder,
    public dialogRef: MatDialogRef<EnderecoUpdateDiolgueComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
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
        this.dialogRef.close();
      },
      error => {
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
