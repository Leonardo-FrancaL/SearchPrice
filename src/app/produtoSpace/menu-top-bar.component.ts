import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-menu-top-bar',
  templateUrl: './menu-top-bar.component.html',
  styleUrls: ['./menu-top-bar.component.scss']
})
export class MenuTopBarComponent implements OnInit {

  constructor(private apiCat:CategoriaService) { }
  categorias:Array<any>;
  ngOnInit() {
    this.apiCat.getCategorias().subscribe(dados=>this.categorias=dados)
  }

}
