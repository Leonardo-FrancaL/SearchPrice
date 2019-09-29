import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoProduto } from '../produto.service';
import { Produto } from '../model/produto';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-produto-itens',
  templateUrl: './produto-itens.component.html',
  styleUrls: ['./produto-itens.component.scss']
})
export class ProdutoItensComponent implements OnInit {

  constructor(private router: Router,private apiSer:ServicoProduto,private sanitizer: DomSanitizer) {}
  produtos:Array<any>;
  

  ngOnInit() {
    this.apiSer.getProdutos().subscribe(dados=>this.produtos = dados);
  }

  teste(prod:Produto){
    return this.sanitizer.bypassSecurityTrustUrl(prod.picture)
  }
 
  clicar(d){ 
    this.router.navigate(['produtoSpec/'],
    {queryParams:{id:d}});
  }
}
