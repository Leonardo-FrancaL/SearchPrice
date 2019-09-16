import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelProdutoComponent } from './painel-produto/painel-produto.component';
import { MenuTopBarComponent } from './produtoSpace/menu-top-bar.component';
import { Erro404Component } from './erro404/erro404.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ProdutoCrdComponent } from './produto-crd/produto-crd.component';


const routes: Routes = [
  { path: 'produtoSpec', component:PainelProdutoComponent},
  {path: 'produtos', component:MenuTopBarComponent},
  {path: 'login',component:LoginPageComponent},
  {path:'404', component: Erro404Component},
  {path: '', redirectTo:'/produtos', pathMatch:'full'},
  {path:'cadastrarProduto',component:ProdutoCrdComponent},
  {path: 'cadastrar', component:CadastrarComponent},
  {path:'**',redirectTo:'404'}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
  
})
export class AppRoutingModule {
 
}
