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
import { HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClienteDialogueComponent } from './components/cliente/cliente-dialogue/cliente-dialogue.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ClienteUpdateDiolgueComponent } from './components/cliente/cliente-update-diolgue/cliente-update-diolgue.component';
import { EnderecoUpdateDiolgueComponent } from './components/cliente/endereco-update-diolgue/endereco-update-diolgue.component';
import { ToastrModule } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';
import { LoaderComponent } from './shared/loader/loader.component';
import { InterceptorService } from './shared/loader/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClienteComponent,
    CadastroComponent,
    ClienteDialogueComponent,
    ClienteUpdateDiolgueComponent,
    EnderecoUpdateDiolgueComponent,
    LoaderComponent,
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
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ToastrModule.forRoot(),
    TextMaskModule
  ],
  providers: [AuthGuard, AuthService, { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
