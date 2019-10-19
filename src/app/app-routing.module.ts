import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelProdutoComponent } from './painel-produto/painel-produto.component';
import { MenuTopBarComponent } from './produtoSpace/menu-top-bar.component';
import { Erro404Component } from './erro404/erro404.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ProdutoCrdComponent } from './produto-crd/produto-crd.component';
import { OfertaCrudComponentComponent } from './oferta-crud-component/oferta-crud-component.component';
import { WorkTableComponent } from './work-table/work-table.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { CategoriaCrudComponent } from './categoria-crud/categoria-crud.component';
import { AdmCrudComponent } from './adm-crud/adm-crud.component';
import { CommentsRateComponent } from './comments-rate/comments-rate.component';


const routes: Routes = [
  //Parte responsável pela rota do sistema
  { path: 'produtoSpec', component:PainelProdutoComponent},
  {path: 'produtos', component:MenuTopBarComponent},
  {path: 'login',component:LoginPageComponent},
  {path:'404', component: Erro404Component},
  
  {path: '', redirectTo:'/produtos', pathMatch:'full'},
  {
    path:'cadastrarProduto',
    canActivate :[AuthGuardService],
    component:ProdutoCrdComponent
  },
  {path: 'cadastrar', component:CadastrarComponent},
  {
    path: 'cadastrarOferta', 
    canActivate :[AuthGuardService],
    component:OfertaCrudComponentComponent
  },
  {
    path: 'workTable', 
    canActivate :[AuthGuardService],
    component:WorkTableComponent
  },
  {
    path:'catWorkFlow',
    canActivate:[AuthGuardService],
    component:CategoriaCrudComponent
  },
  {
    path:'admWorkFlow',
    canActivate:[AuthGuardService],
    component:AdmCrudComponent
  },
  {
    path:'comments',
    canActivate:[AuthGuardService],
    component:CommentsRateComponent
  },
  //Caso o caminho não exista retorna para o 404
  {path:'**',redirectTo:'404'}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
  
})
export class AppRoutingModule {
 
}
