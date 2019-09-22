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

  ngOnInit() {
   let id = this.route.snapshot.queryParams['id'];
   this.apiProd.getProduto(id).subscribe(dados=> this.produto = dados);
  }


  goToStore(link){
    window.location.href =link;
  }
}
