import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvestigationService } from '../investigation.service';

@Component({
  selector: 'app-investigations',
  templateUrl: './investigations.component.html',
  styleUrls: ['./investigations.component.css'],
})
export class InvestigationsComponent implements OnInit {

  headers = [
    "ID d'investigation",
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Date d'envoi"
  ];
  attributs = [
    "id",
    "question1",
    "question2",
    "question3",
    "question4",
    "question5",
    "created_at"
  ];
  
  p: number = 1;
  valider: boolean;
  investigations = [];
  refresh: boolean;
  timer: any;
  forms = new Array<FormGroup>(this.getCasNT());

  getCasNT():number{
    return parseInt(localStorage.getItem('nbrNT'));
  }

  constructor(
    private investigationService: InvestigationService
  ) {
    this.timer = setInterval(()=>{
      this.investigationService.verifierInvestigations();
      if(localStorage.getItem('totalBefore') != localStorage.getItem('totalAfter')){
        this.refresh = true;
      }
    },3000);
  }

  ngOnInit() {
    this.investigationService.refreshNeed.subscribe(()=>{
      this.getInvestigationsNT();
    })
    this.getInvestigationsNT();
    this.valider = false;
    for (let i = 0; i < this.forms.length; i++) {
      this.forms[i] = new FormGroup({
        resultat: new FormControl('',[
          Validators.required,
        ]),
      });
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  getInvestigationsNT(){
    this.investigationService.getInvestigationsNonTraite().subscribe(
      (investigations = [])=>this.investigations=investigations
    );
  }

  actualiser(){
    this.refresh = false;
    this.investigationService.investigations();
    this.forms.push(new FormGroup({
      resultat: new FormControl('',[
        Validators.required,
      ]),
    }));
    this.investigationService.verifierInvestigations();
    localStorage.setItem('totalBefore', localStorage.getItem('totalAfter'));
    this.ngOnInit();
  }

  dateFormat(date: Date){
    return date.toString().substring(0,19).replace('T','  ');
  }
  
  onSubmit(id: any,i: any) {
    this.valider = true;
    this.investigationService.updateInvestigation(id,this.forms[i].value).subscribe(
      () => {
        setTimeout(() => {
          this.investigationService.investigations();
          this.ngOnInit();
          this.valider = false;
        },1000);
      },
      () => {
        this.valider = false;
      }
    )
  }

}