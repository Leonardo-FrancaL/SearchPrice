import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/Categoria';
import { ArrayDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-categoria-crud',
  templateUrl: './categoria-crud.component.html',
  styleUrls: ['./categoria-crud.component.scss']
})
export class CategoriaCrudComponent implements OnInit {

  constructor(private apiCat: CategoriaService) { }
  categoria:any;
  categorias: Array<any>;

  
  ngOnInit() {
    this.apiCat.getCategorias().subscribe(dados => this.categorias = dados);
  }

  checkNulo(c){
    if(c.idPAI== null){
      return '';
    }
    else{
      return c.idPAI.descricao;
    }
  }

  atualizarLista(){
    this.categorias = null;
    this.apiCat.getCategorias().subscribe(dados => this.categorias = dados);
  }
  cadastrarCategoria(catNome){
    let cat = new Categoria();
    let pai = new Array<any>();
    let catPai;

    cat.descricao = catNome.value;

    this.apiCat.getCategoria(this.categoria).subscribe(dados=>{
      let catPai = dados;

      pai.push(catPai);

      cat.idPAI = catPai;

      console.log(JSON.stringify(cat))
      this.apiCat.addCategoria(cat).subscribe(dados=>{
        alert('Categoria cadastrada com sucesso')
        this.categorias.push(cat);
        
      })
    });
    this.atualizarLista();
    catNome.value = "";

    this.categoria = 0;
    
  }
  deletar(id){
    this.apiCat.deleteCategoria(id).subscribe(dados=>{
      alert("Categoria deletada com sucesso")
      this.atualizarLista();
    });
    this.atualizarLista();
  }
  editar(id){

  }

}
