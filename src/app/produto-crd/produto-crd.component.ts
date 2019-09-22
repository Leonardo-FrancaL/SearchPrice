import { Component, OnInit } from '@angular/core';
import { ServicoProduto } from '../produto.service';
import { Produto } from '../model/produto';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProdutoEditComponent } from '../produto-edit/produto-edit.component';
import { Especificacao } from '../model/especific';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-produto-crd',
  templateUrl: './produto-crd.component.html',
  styleUrls: ['./produto-crd.component.scss']
})
export class ProdutoCrdComponent implements OnInit {

  constructor(private apiSer:ServicoProduto,public dialog: MatDialog,private apiCat:CategoriaService){
    this.imagePreview ="../../assets/no-image-available-icon-6.jpg";
  }
  
  prod:Produto;
  produtos:Array<any>;
  selectFile:File;
  imagePreview:string;
  aresp:Array<any>;
  categorias:Array<any>;
  categoriaSelecionada="-";
  

  ngOnInit() {
    this.apiSer.getProdutos().subscribe(dados=>this.produtos = dados);
    this.apiCat.getCategorias().subscribe(dados=>this.categorias=dados);
    this.prod = new Produto();
    console.log(this.produtos)
    this.aresp = new Array<any>();
  }

  atualizarlista(){
    this.apiSer.getProdutos().subscribe(dados=>this.produtos = dados);
    console.log(this.produtos)
  }

  onFileUpload(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imagePreview = event.target.result.toString();
      } 
      this.selectFile = event.target.files[0];  
      this.upLoadFile();   
    }
  }

  addEspecificacao(titulo,desc){
      let esp = new Especificacao();
      esp.descTitulo = desc.value;
      esp.titulo = titulo.value;
      
      this.aresp.push(esp);
      
      
      let label1 = document.createElement('label');
      let label2 = document.createElement('label');

      let br = document.createElement('br');

      let textNode =  document.createTextNode(titulo.value + ' : ');
      let textNode1 = document.createTextNode(desc.value);
      label1.appendChild(textNode);
      label2.appendChild(textNode1);
       
      let lb1 = document.getElementById('espcs');
      lb1.appendChild(label1);
      lb1.appendChild(label2);
      lb1.appendChild(br);

      titulo.value = "";
      desc.value = "";
      
  }
  upLoadFile(){
    this.apiSer.uploadImageProduto(this.selectFile);
    console.log("Asd")
    this.apiSer.uploadImageProduto(this.selectFile);
  }
  cadastrar(name, prec, des,linkSite) {
    
    let cat = new Categoria();

    this.prod.nome_produto = name.value;
    this.prod.preco_produto = prec.value;
    this.prod.desc_produto = des.value;
    this.prod.especfiEspecificacoes = this.aresp;
    this.prod.linkSite = linkSite.value;
    this.apiCat.getCategoria(Number(this.categoriaSelecionada)).subscribe(dados => {
      cat = dados;
      this.prod.categoria = cat;
      console.log(JSON.stringify(cat));
      this.apiSer.addProduto(JSON.stringify(this.prod)).subscribe(r=>alert("Produto :" + r.nome_produto + " foi cadastrado com sucesso"));
      console.log(JSON.stringify(this.prod))
    })
    
    
    
    
   /* 

    name.value = "";
    prec.value = "";
    des.value = "";
    //console.log(this.apiSer.teste(JSON.stringify(this.prod)))
   // this.apiSer.getProdutos().subscribe(r=>console.log(r));
    //console.log(JSON.stringify(this.prod))
    this.atualizarlista();

    this.prod = null;
*/
    //console.log(JSON.stringify(this.prod))
    
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
