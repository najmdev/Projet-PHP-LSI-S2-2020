import { Component, OnInit } from '@angular/core';
import { CarteGeoService } from '../carte-geo.service';

@Component({
  selector: 'app-carte-geo',
  templateUrl: './carte-geo.page.html',
  styleUrls: ['./carte-geo.page.scss'],
})
export class CarteGeoPage implements OnInit {

  longitude = [-5.834022,-5.362530,-3.930782,-5.272261,-6.150928,-6.039835];
  latitude = [35.754909,35.587855,35.241643,35.164654,35.173938,35.458662];
  positifsVilles = [];
  timer: any;

  constructor(private carteGeoService: CarteGeoService) { 
    this.timer = setInterval(()=>{
      this.carteGeoService.majCasPositifs();
      if(localStorage.getItem('positifsVilles') != localStorage.getItem('positifsAfter')){
        localStorage.setItem('positifsVilles',localStorage.getItem('positifsAfter'));
        this.ngOnInit();
      }
    },3000);
  }

  ngOnInit() {
    this.positifsVilles = JSON.parse(localStorage.getItem('positifsVilles'));
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

}
