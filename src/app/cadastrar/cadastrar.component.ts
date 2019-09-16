import { Component, OnInit } from '@angular/core';
import {Usuario} from '../model/User';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {

  user:Usuario;
  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit() {
  }

  cadastrar(email,senha,nomeEmp,link){
    this.user = new Usuario();

    this.user.setEmail(email.value);
    this.user.setSenha(senha.value);
    this.user.setEmpresa(nomeEmp.value);
    this.user.setLinkSite(link.value);


    var jsonUser = JSON.stringify(this.user);

  //  alert(jsonUser);

    email.value = "";
    senha.value = "";
    nomeEmp.value = "";
    link.value = "";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };

    this.makePost(jsonUser,httpOptions);
    alert("Cadastrado com sucesso")
    this.router.navigate(['login']);
  }

  
  async makePost(jsonReq,httpOptions) {
    let ur: string;
    ur = 'http://localhost:8080/user/usuario';
    return  await this
      .http.post(ur, jsonReq,httpOptions).toPromise();

  }

}
