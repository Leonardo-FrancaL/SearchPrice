import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/User';
import { UsuarioService } from '../service/usuario.service.service';

@Component({
  selector: 'app-adm-crud',
  templateUrl: './adm-crud.component.html',
  styleUrls: ['./adm-crud.component.scss']
})
export class AdmCrudComponent implements OnInit {

  constructor(private usrDao:UsuarioService) { }

  isAdm:boolean = true;
  adms:Array<any>;

  save:boolean = true;
  ngOnInit() {
    this.atualizarLista();
  }

  atualizarLista(){
    this.adms = null;
    this.adms = new Array<any>();
    this.usrDao.getUsuarios().subscribe(dados=>{
      for(let c = 0; c< dados.length; c++){
        if(dados[c].adm == 1){
          this.adms.push(dados[c]);
        }
      }
    });
  }

  cadastrar(email,senha,nome){
    let usuario = new Usuario();

    usuario.nome = nome.value;
    usuario.email = email.value;
    usuario.senha = senha.value;

    if(this.isAdm){
      usuario.adm = 1;
    }
    else{
      usuario.adm = 0;
    }
    this.usrDao.addUsuario(usuario).subscribe(dados=>{
      alert("Administrador :"+ dados.nome + ' cadastrado com sucesso!.')
      this.atualizarLista();
    });

    this.atualizarLista();

    email.value = '';
    senha.value = '';
    nome.value = '';
  }

  atualizarUsuario(email,senha,nome,id){
    this.save = false;
    this.usrDao.getUsuario(id).subscribe(dados=>{
      email.value = dados.email;
      senha.value = dados.senha;
      nome.value = dados.nome;
    });
  }

  deletarUsuario(id){
    this.usrDao.deleteUsuario(id).subscribe(dados=>{
      console.log(dados)
      this.atualizarLista();
    });
    this.atualizarLista();
  }
  
}
