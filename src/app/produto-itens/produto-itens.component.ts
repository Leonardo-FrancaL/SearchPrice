import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoProduto } from '../produto.service';


@Component({
  selector: 'app-produto-itens',
  templateUrl: './produto-itens.component.html',
  styleUrls: ['./produto-itens.component.scss']
})
export class ProdutoItensComponent implements OnInit {

  constructor(private router: Router,private apiSer:ServicoProduto) {}
  produtos:Array<any>;


  ngOnInit() {
    this.apiSer.getProdutos().subscribe(dados=>this.produtos = dados);
  }


  clicar(d){ 
    
    this.router.navigate(['produtoSpec/'],
    {queryParams:{id:d}});
  }
}
