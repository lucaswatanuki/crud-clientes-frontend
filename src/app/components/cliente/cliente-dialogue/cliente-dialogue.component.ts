import { EnderecoService } from './../../../service/endereco.service';
import { Endereco } from './../../../models/endereco.model';
import { ClienteService } from './../../../service/cliente.service';
import { Cliente } from './../../../models/cliente.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-dialogue',
  templateUrl: './cliente-dialogue.component.html',
  styleUrls: ['./cliente-dialogue.component.scss']
})
export class ClienteDialogueComponent implements OnInit {

  cliente: Cliente;
  endereco: Endereco = new Endereco();
  formularioCliente: FormGroup;
  hasUnitNumber = false;

  estados = [
    {nome: 'São Paulo', sigla: 'SP'},
    {nome: 'Rio Grande do Sul', sigla: 'RS'},
    {nome: 'Rio de Janeiro', sigla: 'RJ'},
    {nome: 'Minas Gerais', sigla: 'MG'},
    {nome: 'Pernambuco', sigla: 'PE'},
    {nome: 'Rio Grande do Norte', sigla: 'RN'},
  ];


  @ViewChild(FormGroupDirective, { static: true }) form: FormGroupDirective;

  constructor(private fbuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClienteDialogueComponent>,
    private clienteService: ClienteService,
    private enderecoService: EnderecoService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.formularioCliente = this.fbuilder.group({
      nome: new FormControl('', Validators.required),
      rg: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', [Validators.required]),
      nomeEndereco: new FormControl(''),
      numero: new FormControl(''),
      cep: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl(''),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  adicionar(form: FormGroupDirective): void {
    this.cliente = new Cliente();
    this.cliente.nome = this.formularioCliente.get('nome').value;
    this.cliente.cpf = this.formularioCliente.get('cpf').value;
    this.cliente.rg = this.formularioCliente.get('rg').value;
    this.cliente.telefone = this.formularioCliente.get('telefone').value;
    this.cliente.dataNascimento = this.formularioCliente.get('dataNascimento').value;

    this.endereco = new Endereco();
    this.endereco.nome = this.formularioCliente.get('nomeEndereco').value;
    this.endereco.numero = this.formularioCliente.get('numero').value;
    this.endereco.cep = this.formularioCliente.get('cep').value;
    this.endereco.cidade = this.formularioCliente.get('cidade').value;
    this.endereco.estado = this.formularioCliente.get('estado').value;

    this.cliente.endereco = this.endereco;

    console.log(this.cliente);
    this.clienteService.cadastrar(this.cliente).subscribe(data => {
      this.dialogRef.close();
    },
      error => {
      }
    );
  }

}
