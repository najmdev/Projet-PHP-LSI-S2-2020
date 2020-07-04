import { TestBed } from '@angular/core/testing';

import { CarteGeoService } from './carte-geo.service';

describe('CarteGeoService', () => {
  let service: CarteGeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteGeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
