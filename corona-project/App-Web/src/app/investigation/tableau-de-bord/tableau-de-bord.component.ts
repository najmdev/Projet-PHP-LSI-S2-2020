import { Component, OnInit } from '@angular/core';
import { InvestigationService } from '../investigation.service';

declare var statistiques1;
declare var statistiques2;
declare var dates;
declare var focusDef;

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  timer: any;
  today: number = Date.now();
  headers = [
    "Ville",
    "Total des cas positifs",
    "Total des cas négatifs"
  ];
  noms =[
    "Tanger",
    "Tétouan",
    "Al Houceima",
    "Chefchaouen",
    "Larache",
    "Asilah"
  ]
  labels=dates(Date.now());
  positifsDates= this.getDatesCas('positifs');
  negatifsDates= this.getDatesCas('negatifs');
  villes = JSON.parse(localStorage.getItem('totalVilles'));
  positifsVilles = JSON.parse(localStorage.getItem('positifsVilles'));

  // get les cas (+) ou (-) dans "table"
  getDatesCas(type: string){
    var dates = JSON.parse(localStorage.getItem('totalDates'));
    var table=[0,0,0,0,0,0,0,0,0,0];
    for(let i=0;i<10;i++){
      if(type == 'positifs'){
        if(dates[i][1]==undefined)
          table[i]=dates[i][0]['nbr'];
        else
          table[i]=dates[i][1]['nbr'];
      }
      else if(type == 'negatifs')
        table[i]=dates[i][0]['nbr'];
    }
    return table;
  }

  constructor(
    private investigationService: InvestigationService,
  ) {
    this.investigationService.investigations();
    if(localStorage.getItem('totalAfter') == null)
      localStorage.setItem('totalAfter', localStorage.getItem('totalBefore'));
    this.timer = setInterval(()=>{
      this.investigationService.verifierInvestigations();
      if(localStorage.getItem('totalBefore') != localStorage.getItem('totalAfter')){
        this.investigationService.investigations();
        this.ngOnInit();
        localStorage.setItem('totalBefore', localStorage.getItem('totalAfter'));
      }
    },3000);
  }

  ngOnInit() {
    this.callExternalJSFileFunction();
  }

  callExternalJSFileFunction () {
    statistiques1(this.labels,this.positifsDates,this.negatifsDates);
    statistiques2(this.positifsVilles,this.noms);
    focusDef();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getNbr(cas: string){
    return localStorage.getItem(cas);
  }

}