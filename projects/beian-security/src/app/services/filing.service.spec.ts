import { TestBed } from '@angular/core/testing';

import { FilingService } from './filing.service';

describe('FilingService', () => {
  let service: FilingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
