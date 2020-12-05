import { ClienteService } from './../../../service/cliente.service';
import { Cliente } from './../../../models/cliente.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-dialogue',
  templateUrl: './cliente-dialogue.component.html',
  styleUrls: ['./cliente-dialogue.component.scss']
})
export class ClienteDialogueComponent implements OnInit {

  cliente: Cliente = new Cliente();
  formularioCliente: FormGroup;

  constructor(private fbuilder: FormBuilder,
              public dialogRef: MatDialogRef<ClienteDialogueComponent>,
              private clienteService: ClienteService,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.element) {
      this.cliente = this.data.element;
    }
    this.formularioCliente = this.fbuilder.group({
      nome: new FormControl('', Validators.required),
      rg: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      telefone: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  adicionar(): void {
    this.clienteService.cadastrar(this.cliente).subscribe(data => {
      this.dialogRef.close();
    },
    error => {
    }
    );
  }

  update(cliente: Cliente): void {
    this.clienteService.atualizar(cliente).subscribe(
      data => {
        this.dialogRef.close();
      },
      error => {
      }
    );
  }

}
