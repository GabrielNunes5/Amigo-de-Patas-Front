import { TestBed } from '@angular/core/testing';

import { AdoptionFormService } from './adoptionForm.service';

describe('AdoptionFormService', () => {
  let service: AdoptionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptionFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
