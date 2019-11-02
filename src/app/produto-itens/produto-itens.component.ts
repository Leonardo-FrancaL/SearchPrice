import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoProduto } from '../service/produto.service';
import { Produto } from '../model/produto';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoriaService } from '../service/categoria.service';



@Component({
  selector: 'app-produto-itens',
  templateUrl: './produto-itens.component.html',
  styleUrls: ['./produto-itens.component.scss']
})
export class ProdutoItensComponent implements OnInit {

  constructor(private router: Router, private apiSer: ServicoProduto, private sanitizer: DomSanitizer,private apiCat:CategoriaService) { }
  produtos: Array<any>;
  produtosCarregados: Array<any>;
  prod: Array<any>;

  categorias:Array<any>;

  searchProdPerCat(cat){
   let contador = 0;
   this.prod = new Array<any>();
   while(contador < this.produtos.length){
     if(this.produtos[contador].categoria.id == cat){
       this.prod.push(this.produtos[contador]);
     }
     contador++;
   }
   this.cout=0;
   this.produtosCarregados = this.prod;
   let c = 0;
   this.prod = [];
   while(c < this.produtosCarregados.length){
     this.prod.push(this.produtosCarregados[c]);
     if(c==5){
       return this.prod;
     }
     c++;
   }
  }
  ngOnInit() {
    this.apiCat.getCategorias().subscribe(dados=>this.categorias=dados)
    this.apiSer.getProdutos().subscribe(dados => {
      this.produtos = dados;
      this.produtosCarregados = dados;
      this.carouselProdutos('init');
    });

  }

  showBestOffer(prod:Produto){
    if(prod.ofertas.length ==0){
      return '00'
    }else{
      console.log(prod.ofertas)
      return prod.ofertas[0].offer_valorUni;
    }
  }
  teste(prod: Produto) {

    if (prod.picture == null || prod.picture == "") {
      return this.sanitizer.bypassSecurityTrustUrl('../../assets/no-image-available-icon-6.jpg')
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(prod.picture)
    }
  }

  limparFiltroCat(){
    this.produtosCarregados = this.produtos;
    this.carouselProdutos('init');
  }

  clicar(d) {
    this.router.navigate(['produtoSpec/'],
      { queryParams: { id: d } });
  }
  cout = 0;
  carouselProdutos(v?) {
    console.log(this.cout)
    let oldC;
    if (v == 'init') {
      this.cout = 0;
      if (this.produtosCarregados == null) {
      } else {
        this.prod = new Array<any>();
        while (this.cout < this.produtosCarregados.length) {
          this.prod.push(this.produtosCarregados[this.cout])
          if (this.cout == 5) {
            return this.prod;
          }
          this.cout++;
        }
      }
    }
    if (v == 'back') {
      this.prod = new Array<any>();
      
      if (this.cout >= 10) {
        console.log(this.cout)
        this.cout = this.cout - 10;
        oldC = this.cout;
        console.log(this.cout)
      }
      else if (this.cout ==0 || this.cout ==5){
        return this.carouselProdutos('init'); 
      }else{
        return this.carouselProdutos('init'); 
      }
      console.log(this.cout)
      while (this.cout < this.produtosCarregados.length) {
        this.prod.push(this.produtosCarregados[this.cout])
        if (this.cout == oldC + 5) {
          return this.prod;
        }
        this.cout++;
      }
    }

    if (this.cout < this.produtosCarregados.length) {
      oldC = this.cout;
      this.prod = new Array<any>();
      while (this.cout < this.produtosCarregados.length) {
        this.prod.push(this.produtosCarregados[this.cout]);
        if (this.cout == oldC + 5) {
          return this.prod;
        }
        this.cout++;
        console.log(this.cout)
        
      }
      
      return this.prod;
    } else {
      
    }
  }
}
