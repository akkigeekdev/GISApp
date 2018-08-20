import { TestBed, inject } from '@angular/core/testing';

import { DialogWindowService } from './dialog-window.service';

describe('DialogWindowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogWindowService]
    });
  });

  it('should be created', inject([DialogWindowService], (service: DialogWindowService) => {
    expect(service).toBeTruthy();
  }));
});
