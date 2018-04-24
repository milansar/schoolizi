import { TestBed, inject } from '@angular/core/testing';

import { CoredatabaseService } from './coredatabase.service';

describe('CoredatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoredatabaseService]
    });
  });

  it('should be created', inject([CoredatabaseService], (service: CoredatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
