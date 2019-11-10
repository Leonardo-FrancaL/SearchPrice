import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, tap, map } from 'rxjs/operators';
import { ServicoProduto } from '../service/produto.service';
import { Produto } from '../model/produto';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-painel-produto',
  templateUrl: './painel-produto.component.html',
  styleUrls: ['./painel-produto.component.scss']
})
export class PainelProdutoComponent implements OnInit {

  constructor(private route: ActivatedRoute,private apiProd:ServicoProduto,private sanitizer: DomSanitizer) { }

  produto:Produto;


  teste(prod:Produto){
    //return this.sanitizer.bypassSecurityTrustUrl(prod.picture)
    if (prod.picture == null || prod.picture == "") {
      return this.sanitizer.bypassSecurityTrustUrl('../../assets/no-image-available-icon-6.jpg')
    } else {
      return this.sanitizer.bypassSecurityTrustUrl(prod.picture)
    }
  }

  testBugemp(c){
    if(c.empresa.linkFoto == null || c.empresa.linkFoto == ""){
      return this.sanitizer.bypassSecurityTrustUrl("http:localhost/no-image-available-icon-6.jpg");
    }
    
  }

  
  //Ao iniciar pega o parametro que no caso é um ID do produto, faz a consulta e o exibie na tela 
  ngOnInit() {
   let id = this.route.snapshot.queryParams['id'];
   this.apiProd.getProduto(id).subscribe(dados=> {
    this.produto = dados
    
   });
   
  }


  //Vai para o site do produto
  goToStore(link){
    window.location.href =link;
  }
}
