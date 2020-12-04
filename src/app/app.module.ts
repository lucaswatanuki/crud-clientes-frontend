import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClienteComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
