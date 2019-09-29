import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, tap, map } from 'rxjs/operators';
import { ServicoProduto } from '../produto.service';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-painel-produto',
  templateUrl: './painel-produto.component.html',
  styleUrls: ['./painel-produto.component.scss']
})
export class PainelProdutoComponent implements OnInit {

  constructor(private route: ActivatedRoute,private apiProd:ServicoProduto) { }

  produto:Produto;

  //Ao iniciar pega o parametro que no caso é um ID do produto, faz a consulta e o exibie na tela 
  ngOnInit() {
   let id = this.route.snapshot.queryParams['id'];
   this.apiProd.getProduto(id).subscribe(dados=> this.produto = dados);
  }


  //Essa função vai mostrar o mesmo produto só que de outras lojas para fazer o comparativo entre preços 
  //Ainda está sendo trabalhado o SCSS da pagina por isso não vai ser implementado no momento 
  prodRelacionadosComparativo(){

  }
  //Vai para o site do produto
  goToStore(link){
    window.location.href =link;
  }
}
