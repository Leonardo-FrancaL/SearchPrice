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
import {ServicoProduto} from './service/produto.service';
import {MatIconModule} from '@angular/material/icon';
import { ProdutoEditComponent } from './produto-edit/produto-edit.component';
import {MatSelectModule} from '@angular/material/select';
import {CategoriaService} from './service/categoria.service';
import {MatChipsModule} from '@angular/material/chips';
import { OfertaCrudComponentComponent } from './oferta-crud-component/oferta-crud-component.component';
import { CadastroSiteComponent } from './cadastro-site/cadastro-site.component';
import {MatMenuModule} from '@angular/material/menu';
import { WorkTableComponent } from './work-table/work-table.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { CategoriaCrudComponent } from './categoria-crud/categoria-crud.component';
import { AdmCrudComponent } from './adm-crud/adm-crud.component';
import { CommentsRateComponent } from './comments-rate/comments-rate.component';
import { UsuarioService } from './service/usuario.service.service';
import { FooterComponent } from './footer/footer.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HistoryService } from './service/history.service.service';
import { GraficHistoryComponent } from './grafic-history/grafic-history.component';


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
    ProdutoEditComponent,
    OfertaCrudComponentComponent,
    CadastroSiteComponent,
    WorkTableComponent,
    CategoriaCrudComponent,
    AdmCrudComponent,
    CommentsRateComponent,
    FooterComponent,
    GraficHistoryComponent
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
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatSidenavModule

  ],
  providers: [ServicoProduto,CategoriaService,AuthGuardService,UsuarioService,HistoryService],
  entryComponents: [ ProdutoEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
