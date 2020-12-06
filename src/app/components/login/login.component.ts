import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', Validators.required]
    });
  }

  loadSignUp(): void {
    this.router.navigate(['/signup']);
  }

  login(form): void {
    this.authService.login(form.value)
      .subscribe(
        data => {
          this.reloadPage();
        },
        error => {
          alert('Usuario ou senha incorreto');
        });
  }

  reloadPage(): void {
    window.location.replace(environment.host + 'clientes');
  }


}
