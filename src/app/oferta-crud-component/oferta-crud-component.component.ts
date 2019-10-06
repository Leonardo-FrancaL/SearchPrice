import { Component, OnInit } from '@angular/core';
import { ServicoProduto } from '../produto.service';
import { EmpresaService } from '../empresa.service';
import { Produto } from '../model/produto';
import { Empresa } from '../model/Empresa';
import { Oferta } from '../model/Oferta';

@Component({
  selector: 'app-oferta-crud-component',
  templateUrl: './oferta-crud-component.component.html',
  styleUrls: ['./oferta-crud-component.component.scss']
})
export class OfertaCrudComponentComponent implements OnInit {

  produtos:Array<any>;
  prodSelecionado:any;
  empresas:Array<any>;
  empresaSelecionada:any;
  constructor(private apiProd:ServicoProduto,private apiEmp:EmpresaService) { }

  ngOnInit() {
    this.apiProd.getProdutos().subscribe(dados=>this.produtos = dados);
    this.apiEmp.getEmpesas().subscribe(dados=>this.empresas = dados);
  }

  salvarOferta(preco,desc,linkOf){
    let prod = new Produto();
    let emp = new Empresa();

    let ofer = new Oferta();

    ofer.offer_descricao = desc.value;
    ofer.offer_valorUni = preco.value;
    ofer.linkOferta = linkOf.value;

    this.apiEmp.getEmpresa(this.empresaSelecionada).subscribe(dados=>{
      emp = dados;
      ofer.empresa = emp;
      this.apiProd.getProduto(this.prodSelecionado).subscribe(produto=>{
        prod = produto;
        prod.ofertas.push(ofer);
        this.apiProd.addProduto(prod).subscribe(result=>{
          alert(result.id + ' Cadastrado com sucesso')
          console.log(JSON.stringify(prod))
        });
      });
    });
  }


}
