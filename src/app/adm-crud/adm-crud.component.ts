import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adm-crud',
  templateUrl: './adm-crud.component.html',
  styleUrls: ['./adm-crud.component.scss']
})
export class AdmCrudComponent implements OnInit {

  constructor() { }

  isAdm:boolean = true;

  ngOnInit() {
  }

}
