import { Component, OnInit } from '@angular/core';
import { ServicoProduto } from '../produto.service';
import { Produto } from '../model/produto';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProdutoEditComponent } from '../produto-edit/produto-edit.component';

@Component({
  selector: 'app-produto-crd',
  templateUrl: './produto-crd.component.html',
  styleUrls: ['./produto-crd.component.scss']
})
export class ProdutoCrdComponent implements OnInit {

  constructor(private apiSer:ServicoProduto,public dialog: MatDialog){}
  
  prod:Produto;
  produtos:Array<any>;

  ngOnInit() {
    this.apiSer.getProdutos().subscribe(dados=>this.produtos = dados);
    console.log(this.produtos)
  }

  atualizarlista(){
    this.apiSer.getProdutos().subscribe(dados=>this.produtos = dados);
    console.log(this.produtos)
  }

  cadastrar(name, prec, des) {
    this.prod = new Produto();

    this.prod.nome_produto = name.value;
    this.prod.preco_produto = prec.value;
    this.prod.desc_produto = des.value;
    
    this.apiSer.addProduto(JSON.stringify(this.prod)).subscribe(r=>alert("Produto :" + r.nome_produto + " foi cadastrado com sucesso"));

    name.value = "";
    prec.value = "";
    des.value = "";
    //console.log(this.apiSer.teste(JSON.stringify(this.prod)))
   // this.apiSer.getProdutos().subscribe(r=>console.log(r));
    //console.log(JSON.stringify(this.prod))
    this.atualizarlista();

    this.prod = null;
  }

  btnExcluir(id){
    this.apiSer.deleteProduto(id).subscribe(r=>alert("Produto deletado com sucesso!."));
    this.atualizarlista();
  }


  btnEditar(id,nome,preco,desc){
    let pro = new Produto();
    pro.id = id;
    pro.nome_produto = nome;

    const dialogRef = this.dialog.open(ProdutoEditComponent, {
      width: '650px',
      data:{id:id,nome_produto:nome,preco_produto:preco,desc_produto:desc}
    });
    dialogRef.afterClosed().subscribe(result => {
     this.atualizarlista();
    });
  }
}
