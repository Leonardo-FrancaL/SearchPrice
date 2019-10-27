import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Usuario } from '../model/User';
import { Router } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  /*O login tem que ser trabalhado no banckend primeiro*/
  user:Array<any>;
  constructor(private apiLogin:ApiService,private router: Router,private auth:AuthGuardService) { }

  ngOnInit() {
  }

  logar(mail,pass){
    let user;
    this.apiLogin.getUsuario(mail.value).subscribe(dados=>{
      user = dados;
      if(user!=null && user.senha == pass.value){
        if(user.adm == 1){
          this.auth.alter(true);
          sessionStorage.setItem('id', dados.id.toString());
          sessionStorage.setItem('name', dados.nome);
          this.router.navigate(['workTable'],
          {queryParams:{id:user.id}});
        }else{
          sessionStorage.setItem('id', dados.id.toString());
          sessionStorage.setItem('name', dados.nome);
          this.router.navigate(["/produtos"])
        }
      }else{
        document.getElementById("mail").classList.add("logError");
        document.getElementById("senha").classList.add("logError");
      }
    })
  }
}
