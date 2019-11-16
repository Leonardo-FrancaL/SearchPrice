import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../service/categoria.service';
import { ServicoProduto } from '../service/produto.service';

@Component({
  selector: 'app-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.scss']
})
export class TopBarMenuComponent implements OnInit {

  constructor(private router: Router, private apiCat: CategoriaService, private apiSer: ServicoProduto) { }

  shallHide: boolean = false;
  ngOnInit() {

    if (sessionStorage.getItem('name') != null && sessionStorage.getItem('name') != 'null') {
      this.shallHide = true;
      document.getElementById('btnE').classList.remove('btnEntrar');
      document.getElementById('btnE').classList.add('hide');
      document.getElementById('name').classList.remove('hide');
      document.getElementById('btnSair').classList.remove('hide');
      document.getElementById('btnSair').classList.add('btnSair');
      document.getElementById('menu').classList.remove('hide');
      //alert(this.shallHide)
    } else if (sessionStorage.getItem('name') == 'null') {
      this.logout()
    } else {
      this.logout()
    }
    
  }

  logout() {
    sessionStorage.setItem('id', null)
    sessionStorage.setItem('name', null)
    document.getElementById('btnE').classList.remove('hide');
    document.getElementById('btnE').classList.add('btnEntrar');
    document.getElementById('name').classList.add('hide');
    document.getElementById('btnSair').classList.add('hide');
    document.getElementById('menu').classList.add('hide');

  }
  getUserName() {
    return sessionStorage.getItem('name')
  }

  //Manda para a tela de login 
  logarBtn() {
    this.router.navigate(['login']);
  }

  btnSearch(s) {
    //this.router.navigate(['prodResult/'],{ queryParams: { txRes: s.value } });
    this.apiCat.getCategoriaN(s.value).subscribe(dados => {
      if (dados != null) {
        this.router.navigate(['prodResult/'], { queryParams: { txRes: dados.id } });
      } else {
        //this.router.navigate(['produtoSpec'],{ queryParams: {txRes:s.value}});
        this.apiSer.getProdutoN(s.value).subscribe(dados => {
          if (dados != null) {
            this.router.navigate(['produtoSpec'], { queryParams: { id: dados.id } });
          } else {
            this.router.navigate(['prodResult/'], { queryParams: { txRes: null } });
          }
        })

      }
    })
  }

}
