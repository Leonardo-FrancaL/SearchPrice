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
import { GraficHistoryComponent } from './grafic-history/grafic-history.component';
import { ProdutosSResultComponent } from './produtos-sresult/produtos-sresult.component';
import { MycommentsComponent } from './mycomments/mycomments.component';


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
    path:'prodResult',
    component:ProdutosSResultComponent
  },
  {
    path:'comments',
    canActivate:[AuthGuardService],
    component:CommentsRateComponent
  },
  {
    path:'graf',
    component:GraficHistoryComponent
  },
  {
    path:'mycoments',
    canActivate:[AuthGuardService],
    component:MycommentsComponent
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
