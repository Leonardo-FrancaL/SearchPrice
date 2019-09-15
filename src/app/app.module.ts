import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoCrdComponent } from './produto-crd/produto-crd.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MenuTopBarComponent } from './produtoSpace/menu-top-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ProdutoItensComponent } from './produto-itens/produto-itens.component';
import {MatCardModule} from '@angular/material/card';
import { PainelProdutoComponent } from './painel-produto/painel-produto.component';
import {MatDialogModule} from '@angular/material/dialog';
import { Erro404Component } from './erro404/erro404.component';
import { TopBarMenuComponent } from './top-bar-menu/top-bar-menu.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    ProdutoCrdComponent,
    MenuTopBarComponent,
    ProdutoItensComponent,
    PainelProdutoComponent,
    Erro404Component,
    TopBarMenuComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule ,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
