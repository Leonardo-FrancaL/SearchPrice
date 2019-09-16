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
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {ServicoProduto} from './produto.service';
import {MatIconModule} from '@angular/material/icon';
import { ProdutoEditComponent } from './produto-edit/produto-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProdutoCrdComponent,
    MenuTopBarComponent,
    ProdutoItensComponent,
    PainelProdutoComponent,
    Erro404Component,
    TopBarMenuComponent,
    LoginPageComponent,
    CadastrarComponent,
    ProdutoEditComponent
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
    MatCheckboxModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule

  ],
  providers: [ServicoProduto],
  entryComponents: [ ProdutoEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
