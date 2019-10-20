import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { AuthGuardService } from '../guards/auth-guard.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-work-table',
  templateUrl: './work-table.component.html',
  styleUrls: ['./work-table.component.scss']
})
export class WorkTableComponent implements OnInit {

  user:any;
  prod:boolean = false;
  offer:boolean = false;
  cat:boolean = false;
  adm:boolean = false;
  
  constructor(private route: ActivatedRoute,private apiLogin:ApiService,private router: Router,private sanitizer: DomSanitizer,private auth:AuthGuardService) { }

  ngOnInit() {
    this.auth.alter(true);
    
    let id = this.route.snapshot.queryParams['id'];
    this.apiLogin.getUsuarioId(id).subscribe(dados=>{
      this.user=dados;
    });
  }

  logout(){
    this.auth.alter(false);
    this.router.navigate(['produtos'])
  }

  cadProd(){
    this.offer = false;
    this.cat = false;
    this.adm = false;
    this.prod = true;
  }

  cadCat(){
    this.prod = false;
    this.offer = false;
    this.adm = false;
    this.cat = true;
  }
  cadOffer(){
    this.prod = false;
    this.cat = false;
    this.adm = false;
    this.offer = true;
  }

  cadAdm(){
    this.offer = false;
    this.cat = false;
    this.prod = false;
    this.adm = true;
  }

  aVlOffer(){
    this.offer = false;
    this.cat = false;
    this.prod = false;
    this.adm = false;
  }
  
}
