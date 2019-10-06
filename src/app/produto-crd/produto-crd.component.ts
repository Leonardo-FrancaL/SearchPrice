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

  //Define uma imagem (sem imagem) para quando entrar na tela
  constructor(private apiSer:ServicoProduto,public dialog: MatDialog,private apiCat:CategoriaService){
    this.imagePreview ="../../assets/no-image-available-icon-6.jpg";
  }
  
 
  produtos:Array<any>;
  selectFile:File;
  imagePreview:string;
  aresp:Array<any>;
  categorias:Array<any>;
  categoriaSelecionada="-";
  
  /*Ao entrar ele carrega a lista de produtos cadastrados,
  e tambem carrega a checkbox de categoria com as categorias cadastradas */
  ngOnInit() {
    this.apiSer.getProdutos().subscribe(dados=>this.produtos = dados);
    this.apiCat.getCategorias().subscribe(dados=>this.categorias=dados);
    
    console.log(this.produtos)
    this.aresp = new Array<any>();
  }


  /**
   * Metodo utilizado para atualizar a lista,
   * caso ocorra alguma atualização na lista é so chamar esse metodo
   */
  atualizarlista(){
    this.apiSer.getProdutos().subscribe(dados=>this.produtos = dados);
    console.log(this.produtos)
  }


  /*
  * Função responsavel para enviar a foto para o servidor.
  */
  onFileUpload(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        
       this.imagePreview = reader.result as string;
      } 
      this.selectFile = event.target.files[0];  
     
    }
  }

  /*Quando é clicado no botão + em especificação
  * o titulo e a descrição sera adicionados em um array e depois colocados em label
  * o nome do array e aresp(global)
  */
  addEspecificacao(titulo,descT){
    //Estancia um objeto especificacao
      let esp = new Especificacao();
      //Obtem o a descricao da especificação
      esp.descTitulo = descT.value;
      //Obtem o titulo da especificação
      esp.titulo = titulo.value;
      
      //Adiciona a especificação no array
      this.aresp.push(esp);
      
      //Cria os labels que vai ser mostrado a especificação incluida
      let label1 = document.createElement('label');
      let label2 = document.createElement('label');

      //Cria uma quebra de linha 
      let br = document.createElement('br');

      //adiciona o texto nos labels
      let textNode =  document.createTextNode(titulo.value + ' : ');
      let textNode1 = document.createTextNode(descT.value);
      label1.appendChild(textNode);
      label2.appendChild(textNode1);
       
      //Adiciona os labels e o br dentro do elemento que tiver a id 'espcs'
      let lb1 = document.getElementById('espcs');
      lb1.appendChild(label1);
      lb1.appendChild(label2);
      lb1.appendChild(br);

      //Limpa o valor dos inputs
      titulo.value = "";
      descT.value = "";
      
  }

  //Manda a imagem para o backend
  upLoadFile(id){
    this.apiSer.uploadImageProduto(this.selectFile,id).subscribe(dados=>{
      
    });
    
    
  }

  //Função responsável por cadastrar os produtos
  cadastrar(name, prec, des,linkSite) {
    let prod = new Produto();
    //Cria uma categoria 
    let cat = new Categoria();
    //Nesse bloco é adicionado os valores do produto
    //Prod é uma variavel global tb 
    prod.nome_produto = name.value;
    //prod.preco_produto = prec.value;
    prod.desc_produto = des.value;
    prod.especfiEspecificacoes = this.aresp;
    prod.linkSite = linkSite.value;
    
    //Pega a cagoria por id (requisição no backend )
    this.apiCat.getCategoria(Number(this.categoriaSelecionada)).subscribe(dados => {
      cat = dados;

      //Apos pegar a categoria no backend , e feito o cadastro do produto
      //Enviando o JSON para o backend
      prod.categoria = cat;
      
      this.apiSer.addProduto(JSON.stringify(prod)).subscribe(r=>{
        prod = r;
        this.upLoadFile(r.id);
        alert("Produto :" + prod.nome_produto  + " cadastrado com sucesso !.")
        console.log(JSON.stringify(prod))
        name.value = "";
        prec.value = "";
        des.value = "";
        this.atualizarlista();  
      });
      
    })
    
    //Bloco de codigo utilizado para teste
    //console.log(JSON.stringify(this.prod))
    
  }

  ///Deleta um produto
  btnExcluir(id){
    this.apiSer.deleteProduto(id).subscribe(r=>alert("Produto deletado com sucesso!."));
    this.atualizarlista();
  }

  //Edita um produto
  //É aberto uma Dialog para editar o produto
  btnEditar(id,nome,preco,desc){
    let pro = new Produto();
    pro.id = id;
    pro.nome_produto = nome;

    //Width é a largura do dialog, data é os dados que serão mandados para a outra tela (Que no caso é a ProdutoEditComponent)
    const dialogRef = this.dialog.open(ProdutoEditComponent, {
      width: '650px',
      data:{id:id,nome_produto:nome,preco_produto:preco,desc_produto:desc}
    });
    dialogRef.afterClosed().subscribe(result => {
     this.atualizarlista();
    });
  }
}
