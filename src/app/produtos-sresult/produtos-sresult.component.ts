import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';
import { ServicoProduto } from '../service/produto.service';
import { Produto } from '../model/produto';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-produtos-sresult',
  templateUrl: './produtos-sresult.component.html',
  styleUrls: ['./produtos-sresult.component.scss']
})
export class ProdutosSResultComponent implements OnInit {

  constructor(private route: ActivatedRoute,private apiCat:CategoriaService,private apiSer: ServicoProduto,private sanitizer: DomSanitizer) { }
  categoria:Categoria;
  produtos:Array<Produto>;

  ngOnInit() {
    let dados = this.route.snapshot.queryParams['txRes'];
    this.apiCat.getCategoria(dados).subscribe(dados=>{
      this.categoria = dados;
      this.apiSer.getProdutosCat(this.categoria).subscribe(dados=>{
        this.produtos = dados;
      });
    })
  }

  showBestOffer(prod:Produto){
    if(prod.ofertas.length ==0){
      return '00'
    }else{
      console.log(prod.ofertas)
      return prod.ofertas[0].offer_valorUni;
    }
  }

  mostrarImagen(prod: Produto) {

    if (prod.picture == null || prod.picture == "") {
      return this.sanitizer.bypassSecurityTrustUrl('../../assets/no-image-available-icon-6.jpg')
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(prod.picture)
    }
  }

  showDesc(prod: Produto){
    let str = "";
    if(prod.desc_produto.length > 20){
      for(let i = 0; i <30; i++){
        str = prod.desc_produto[i];
      }
      return str + '<a>ler mais</a>';
    }else{
      return prod.desc_produto;
    }
  }

}
