import { CadastroService } from './../../service/cadastro.service';
import { Cadastro } from './../../models/cadastro.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class CadastroComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  formularioCadastro: FormGroup;
  cadastroModel: Cadastro;

  @ViewChild(FormGroupDirective, { static: true }) form: FormGroupDirective;

  // tslint:disable-next-line: max-line-length
  constructor(private cadastroService: CadastroService, private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formularioCadastro = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login(): void {
    this.form.resetForm();
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {
      duration: 15000,
      horizontalPosition: this.horizontalPosition
    });
  }

  onSubmit(form: FormGroupDirective): void {
    console.log(this.formularioCadastro);
    this.cadastroModel = new Cadastro(
      this.formularioCadastro.get('username').value,
      this.formularioCadastro.get('password').value,
    );

    console.log(this.cadastroModel);
    this.cadastroService.signup(this.cadastroModel).subscribe(
      data => {
        console.log(data);
        this.form.resetForm();
        this.openSnackBar('Conta criada com sucesso', 'OK');
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
