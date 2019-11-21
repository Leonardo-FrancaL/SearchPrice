import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Avaliacao } from '../model/avaliacao';
import { ServicoProduto } from '../service/produto.service';
import { Produto } from '../model/produto';
import { Usuario } from '../model/User';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-comments-rate',
  templateUrl: './comments-rate.component.html',
  styleUrls: ['./comments-rate.component.scss']
})
export class CommentsRateComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiProd: ServicoProduto, private apiLogin: ApiService) { }

  id;
  produto: Produto;


  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    this.apiProd.getProduto(this.id).subscribe(dados => {
      this.produto = dados

    });
  }

  atualizarPosts() {
    this.produto = null;
    this.apiProd.getProduto(this.id).subscribe(dados => {
      this.produto = dados

    });
  }

  getDono(c) {
    if (c == null || c == "") {
      return 'Anonimo';
    } else {
      return c;
    }
  }

  test(i) {

    let a = "★";
    let b: number = 1;

    while (b < i) {
      a += "★"
      b++;
    }
    return a;
  }
  enviarComentario(titulo, desc, s2, s3, s4, s5) {
    if (sessionStorage.getItem('name') != null && sessionStorage.getItem('name') != 'null') {
      let avaliacao = new Avaliacao();
      let listAvaliacao = new Array<Avaliacao>();

      avaliacao.aval_titulo = titulo.value;
      avaliacao.aval_comentario = desc.value;
      avaliacao.aval_post_owner = sessionStorage.getItem('name');

      if (s5.checked) {
        avaliacao.aval_rating_star = 5;
      } else if (s4.checked) {
        avaliacao.aval_rating_star = 4;
      } else if (s3.checked) {
        avaliacao.aval_rating_star = 3;
      } else if (s2.checked) {
        avaliacao.aval_rating_star = 2;
      } else {
        avaliacao.aval_rating_star = 1;
      }

      let id = sessionStorage.getItem('id')

      avaliacao.usr_id = id;

      listAvaliacao.push(avaliacao);
      this.produto.avaliacoes.push(avaliacao)

      this.apiProd.updateProduto(this.produto).subscribe(dados => {
        alert('Comentario postado com sucesso');
        this.atualizarPosts();
        
      })
      titulo.value = "";
      desc.value = "";


    } else if (sessionStorage.getItem('name') == 'null') {
      alert('Não é possivel enviar um comentario sem logar no sistema')
    } else {
      alert('Não é possivel enviar um comentario sem logar no sistema')
    }

  }



}
