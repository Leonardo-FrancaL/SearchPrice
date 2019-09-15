import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-produto-itens',
  templateUrl: './produto-itens.component.html',
  styleUrls: ['./produto-itens.component.scss']
})
export class ProdutoItensComponent implements OnInit {

  constructor(private router: Router) {}
 


  ngOnInit() {
  }


  clicar(){ 
    this.router.navigate(['produtoSpec']);
  }
}
