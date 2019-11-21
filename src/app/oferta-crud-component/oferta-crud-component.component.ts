import { Component, OnInit } from '@angular/core';
import { ServicoProduto } from '../service/produto.service';
import { EmpresaService } from '../service/empresa.service';
import { Produto } from '../model/produto';
import { Empresa } from '../model/Empresa';
import { Oferta } from '../model/Oferta';

import {History} from '../model/History';
import { HistoryService } from '../service/history.service.service';

@Component({
  selector: 'app-oferta-crud-component',
  templateUrl: './oferta-crud-component.component.html',
  styleUrls: ['./oferta-crud-component.component.scss']
})
export class OfertaCrudComponentComponent implements OnInit {

  produtos: Array<any>;
  prodSelecionado: any;
  empresas: Array<any>;
  empresaSelecionada: any;
  constructor(private apiProd: ServicoProduto, private apiEmp: EmpresaService,private history:HistoryService) {
  }

  ngOnInit() {
    this.apiProd.getProdutos().subscribe(dados => this.produtos = dados);
    this.apiEmp.getEmpesas().subscribe(dados => this.empresas = dados);
  }

  charge() {
    this.apiProd.getProdutos().subscribe(dados => this.produtos = dados);
    this.apiEmp.getEmpesas().subscribe(dados => this.empresas = dados);
  }

  salvarOferta(preco, desc, linkOf) {
    let prod = new Produto();
    let emp = new Empresa();

    let ofer = new Oferta();

    ofer.offer_descricao = desc.value;
    ofer.offer_valorUni = preco.value;
    ofer.linkOferta = linkOf.value;

    this.apiEmp.getEmpresa(this.empresaSelecionada).subscribe(dados => {
      emp = dados;
      ofer.empresa = emp;
      this.apiProd.getProduto(this.prodSelecionado).subscribe(produto => {
        prod = produto;
        prod.ofertas.push(ofer);
        this.apiProd.addProduto(prod).subscribe(result => {
          this.saveInHistory(result)
          alert(result.id + ' Cadastrado com sucesso')
          console.log(JSON.stringify(prod))
        });
      });
    });
  }


  private saveInHistory(p: Produto) {
    let hist = new History();
    let valor = 0;
    let i = 1;
    for (i = 0; i < p.ofertas.length; i++) {
      valor += p.ofertas[1].offer_valorUni;
    }
    
    valor = valor / i;
    hist.his_preco = valor;

    hist.produto = p;

    var data = new Date();
    var dia     = data.getDate();
    var mes     = data.getMonth(); 
    var ano4    = data.getFullYear(); 

    var str_data = dia + '/' + (mes+1) + '/' + ano4;
    hist.his_dt_periodo = str_data;

    this.history.addHistory(hist).subscribe(dados=>{
      console.log('historico salvo')
    });

    // this.his_preco = valor;
    // this.produto = p;
    // java.util.Date d = new Date();
    // DateFormat a = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
    // this.his_dt_periodo = a.format(d);


  }
}
