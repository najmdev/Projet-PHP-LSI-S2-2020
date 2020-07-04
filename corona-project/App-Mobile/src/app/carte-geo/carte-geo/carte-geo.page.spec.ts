import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarteGeoPage } from './carte-geo.page';

describe('CarteGeoPage', () => {
  let component: CarteGeoPage;
  let fixture: ComponentFixture<CarteGeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteGeoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarteGeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
