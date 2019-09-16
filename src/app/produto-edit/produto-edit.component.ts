import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Produto } from '../model/produto';
import { ServicoProduto } from '../produto.service';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.scss']
})
export class ProdutoEditComponent implements OnInit {

  
  constructor(public dialogRef: MatDialogRef<ProdutoEditComponent>,@Inject(MAT_DIALOG_DATA) public prod:Produto,private apiSer:ServicoProduto) { 
    
  }

  ngOnInit() {
  }

  editar(nome,preco,desc,id){
    let prod = new Produto();

    prod.id = id.value;
    prod.desc_produto = desc.value;
    prod.nome_produto = nome.value;
    prod.preco_produto = preco.value;


    this.apiSer.updateProduto(id.value,JSON.stringify(prod)).subscribe(r=>console.log("Produto :" + r.nome_produto + " foi atualizado com sucesso"));;
    this.dialogRef.close();
  }
}
