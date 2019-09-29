import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar-menu',
  templateUrl: './top-bar-menu.component.html',
  styleUrls: ['./top-bar-menu.component.scss']
})
export class TopBarMenuComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }


  //Manda para a tela de login 
  logarBtn(){
    this.router.navigate(['login']);
  }

}
