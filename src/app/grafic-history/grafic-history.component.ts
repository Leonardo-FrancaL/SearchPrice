import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../service/history.service.service';

@Component({
  selector: 'app-grafic-history',
  templateUrl: './grafic-history.component.html',
  styleUrls: ['./grafic-history.component.scss']
})
export class GraficHistoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,private his:HistoryService) { }

  id;
  ngOnInit() {
    this.id = this.route.snapshot.queryParams['id'];
    var dps = []; // dataPoints
    //dps.push({y:500,label:'teste'})
    var chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: ""
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: "line",
        dataPoints: dps
      }]
    });
    
    
    this.his.getHistory(this.id).subscribe(dados=>{
      //dps = this.preencherGrafico(dados);
     // this.loadChart(dps);
     for (let a = 0; a < dados.length; a++) {
      
      dps.push({
        label:dados[a].his_dt_periodo,
        y:dados[a].his_preco
        
      })
    }
    chart.render();
    })
    
    
  }

  loadChart(dps){
   
  }
  preencherGrafico(dados):any {
    
    var dps = [];
    for (let a = 0; a < dados.length; a++) {
      
      dps.push({
        label:'dados[a].his_dt_periodo',
        y:1200
        
      })
    }
    
    return dps;
  }

}
