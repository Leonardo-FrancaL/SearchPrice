import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-produto-crd',
  templateUrl: './produto-crd.component.html',
  styleUrls: ['./produto-crd.component.scss']
})
export class ProdutoCrdComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  cadastrar(name, prec, des) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
    //alert(name.value+ '\n' + prec.value + '\n' + des.value)
    let jsonReq: string;
    jsonReq = '{"name":"' + name.value + '","caracteristicas":"' + des.value + '"}'

    console.log(this.makePost(jsonReq,httpOptions))
    
  }

  async makePost(jsonReq,httpOptions) {
    let ur: string;
    ur = 'localhost:8080/api/produto';
    return  await this
      .http.post(ur, jsonReq,httpOptions).toPromise();

  }

  getTest(){
    let ur: string;
    ur = 'localhost:8080/api/produtos';
    console.log(  this.http.get(ur));
  }

}
