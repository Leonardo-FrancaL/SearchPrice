import { Component, OnInit } from '@angular/core';
import { ServicoProduto } from '../service/produto.service';

@Component({
  selector: 'app-mycomments',
  templateUrl: './mycomments.component.html',
  styleUrls: ['./mycomments.component.scss']
})
export class MycommentsComponent implements OnInit {

  constructor(private apiProd: ServicoProduto) { }

  myComments:Array<any>;

  ngOnInit() {
    let id = sessionStorage.getItem('id')

    this.apiProd.getProdutos().subscribe(dados=>{
      for(let i =0; i < dados.length; i++){
        for(let a =0; a < dados[i].avaliacoes.length; a++){
          if(dados[i].avaliacoes[a].usr_id = id){
            this.myComments.push(dados[i])
          }
        }
      }
    });
  }

}
