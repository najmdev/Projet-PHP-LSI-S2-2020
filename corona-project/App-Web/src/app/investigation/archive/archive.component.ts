import { Component, OnInit } from '@angular/core';
import { InvestigationService } from '../investigation.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  headers = [
    "ID d'investigation",
    "Date de validation",
    "Résultat"
  ];
  attributs = [
    "id",
    "updated_at",
    "traite"
  ];
  p: number = 1;
  archive = [];

  constructor(
    private investigationService: InvestigationService,
  ) {}

  ngOnInit(){
    this.investigationService.refreshNeed.subscribe(()=>{
      this.getInvestigationsT();
    })
    this.getInvestigationsT();
  }

  getInvestigationsT(){
    this.investigationService.getInvestigationsTraite().subscribe(
      (archive = [])=> this.archive=archive
    );
  }

  dateFormat(date: Date){
    return date.toString().substring(0,19).replace('T','  ');
  }

  getCasT(){
    return parseInt(localStorage.getItem('nbrP'))+parseInt(localStorage.getItem('nbrN'));
  }

  resultat(resul: number){
    if(resul==1) 
      return 'positif';
    else 
      return 'negatif'
  }
}