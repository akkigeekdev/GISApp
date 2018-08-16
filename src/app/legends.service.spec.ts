import { TestBed, inject } from '@angular/core/testing';

import { LegendsService } from './legends.service';

describe('LegendsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegendsService]
    });
  });

  it('should be created', inject([LegendsService], (service: LegendsService) => {
    expect(service).toBeTruthy();
  }));
});
