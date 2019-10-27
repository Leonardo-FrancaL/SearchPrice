import { Component, OnInit } from '@angular/core';
import { ServicoProduto } from '../service/produto.service';
import { Produto } from '../model/produto';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoEditComponent } from '../produto-edit/produto-edit.component';
import { Especificacao } from '../model/especific';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/Categoria';
import { getMatScrollStrategyAlreadyAttachedError } from '@angular/cdk/overlay/typings/scroll/scroll-strategy';

@Component({
  selector: 'app-produto-crd',
  templateUrl: './produto-crd.component.html',
  styleUrls: ['./produto-crd.component.scss']
})
export class ProdutoCrdComponent implements OnInit {

  //Define uma imagem (sem imagem) para quando entrar na tela
  constructor(private apiSer: ServicoProduto, public dialog: MatDialog, private apiCat: CategoriaService) {
    this.imagePreview = "../../assets/no-image-available-icon-6.jpg";
  }


  produtos: Array<any>;
  selectFile: File;
  imagePreview: string;
  aresp: Array<any>;
  categorias: Array<any>;
  categoriasFilhas: Array<any>;
  categoriaSelecionada: number = 0;
  catFilhaSelecionada: number = 0;
  catFilha2: number = 0;
  catFilha3: number = 0;
  subCatSelecionada = "-";
  catsSubs: Array<any>;
  tableEspecs = false;

  /*Ao entrar ele carrega a lista de produtos cadastrados,
  e tambem carrega a checkbox de categoria com as categorias cadastradas */
  ngOnInit() {
    this.categorias = new Array<any>();
    this.catsSubs = new Array<any>();
    this.apiSer.getProdutos().subscribe(dados => this.produtos = dados);
    this.apiCat.getCategorias().subscribe(dados => {
      for (let c = 0; c < dados.length; c++) {
        if (dados[c].idPAI == null) {
          this.categorias.push(dados[c])
        } else {
          this.catsSubs.push(dados[c]);
        }
      }
    });

    console.log(this.produtos)
    this.aresp = new Array<Especificacao>();
  }


  listarSubs(nivel) {
    let listCats = new Array<any>();
    switch (nivel) {
      case 1: {
        if (this.categoriaSelecionada != null || this.categoriaSelecionada != 0) {
          for (let c = 0; c < this.catsSubs.length; c++) {
            if (this.catsSubs[c].idPAI.id == this.categoriaSelecionada) {
              listCats.push(this.catsSubs[c]);
            }
          }

          return listCats;
        }
        else {

          return this.catsSubs;
        }
      }
      case 2: {
        let listShow = new Array<any>();
        listCats = this.catsSubs;
        if (this.catFilhaSelecionada != null || this.catFilhaSelecionada != 0) {
          for (let c = 0; c < listCats.length; c++) {
            if (listCats[c].idPAI != null) {
              if (listCats[c].idPAI.id == this.catFilhaSelecionada) {
                listShow.push(listCats[c])
              }
            }
          }
          if (listShow.length == 0) {
            this.catFilha3 = 0;
            this.catFilha2 = 0;
          }
          return listShow;
        }
      }
      case 3: {
        let listShow = new Array<any>();
        listCats = this.catsSubs;
        if (this.catFilha2 != null || this.catFilha2 != 0) {
          for (let c = 0; c < listCats.length; c++) {
            if (listCats[c].idPAI != null) {
              if (listCats[c].idPAI.id == this.catFilha2) {
                listShow.push(listCats[c])
              }
            }
          }
          return listShow;
        }
      }
      default: break;
    }
  }

  /**
   * Metodo utilizado para atualizar a lista,
   * caso ocorra alguma atualização na lista é so chamar esse metodo
   */
  atualizarlista() {
    this.produtos = null;
    this.apiSer.getProdutos().subscribe(dados => this.produtos = dados);
    console.log(this.produtos)
  }


  /*
  * Função responsavel para enviar a foto para o servidor.
  */
  onFileUpload(event) {
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

  addEspecificacao(titulo, descT) {
    //Estancia um objeto especificacao
    let esp = new Especificacao();
    //Obtem o a descricao da especificação
    esp.descTitulo = descT.value;
    //Obtem o titulo da especificação
    esp.titulo = titulo.value;

    this.tableEspecs = true;
    //Adiciona a especificação no array
    this.aresp.push(esp);

    //Limpa o valor dos inputs
    titulo.value = "";
    descT.value = "";

  }

  removeEspec(es) {
    let esp = new Especificacao();
    esp.descTitulo = es.descTitulo;
    esp.titulo = es.titulo;

    let index = this.aresp.indexOf(esp);
    this.aresp.splice(index, 1)

  }

  //Manda a imagem para o backend
  upLoadFile(id) {
    this.apiSer.uploadImageProduto(this.selectFile, id).subscribe(dados => {

    });


  }

  //Função responsável por cadastrar os produtos
  cadastrar(name, prec, des, linkSite) {
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

    let categoria;
    //Pega a cagoria por id (requisição no backend )
    if (this.categoriaSelecionada != 0) {
      if (this.catFilhaSelecionada != 0) {
        if (this.catFilha2 != 0) {
          if (this.catFilha3 != 0) {
            this.apiCat.getCategoria(this.catFilha3).subscribe(dados=>{
              categoria = dados;
              prod.categoria = categoria;
              this.apiSer.addProduto(prod).subscribe(dados=>{
                this.atualizarlista();
                this.upLoadFile(dados.id)
                alert("Produto adicionado com sucesso!")
              })
            });
          } else {
            this.apiCat.getCategoria(this.catFilha2).subscribe(dados=>{
              categoria = dados;
              prod.categoria = categoria;
              this.apiSer.addProduto(prod).subscribe(dados=>{
                this.atualizarlista();
                this.upLoadFile(dados.id)
                alert("Produto adicionado com sucesso!")
              })
            });
          }
        } else {
          this.apiCat.getCategoria(this.catFilhaSelecionada).subscribe(dados=>{
            categoria = dados;
            prod.categoria = categoria;
            this.apiSer.addProduto(prod).subscribe(dados=>{
              this.atualizarlista();
              this.upLoadFile(dados.id)
              alert("Produto adicionado com sucesso!")
            })
          });
        }
      } else {
        this.apiCat.getCategoria(this.categoriaSelecionada).subscribe(dados=>{
          categoria = dados;
          prod.categoria = categoria;
          this.apiSer.addProduto(prod).subscribe(dados=>{
            this.atualizarlista();
            this.upLoadFile(dados.id)
            alert("Produto adicionado com sucesso!")
          })
        });
      }
    }

    //Bloco de codigo utilizado para teste
    //console.log(JSON.stringify(this.prod))

  }

  ///Deleta um produto
  btnExcluir(id) {
    this.apiSer.deleteProduto(id).subscribe(r => alert("Produto deletado com sucesso!."));
    this.atualizarlista();
  }

  //Edita um produto
  //É aberto uma Dialog para editar o produto
  btnEditar(id, nome, preco, desc) {
    let pro = new Produto();
    pro.id = id;
    pro.nome_produto = nome;

    //Width é a largura do dialog, data é os dados que serão mandados para a outra tela (Que no caso é a ProdutoEditComponent)
    const dialogRef = this.dialog.open(ProdutoEditComponent, {
      width: '650px',
      data: { id: id, nome_produto: nome, preco_produto: preco, desc_produto: desc }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.atualizarlista();
    });
  }
}
