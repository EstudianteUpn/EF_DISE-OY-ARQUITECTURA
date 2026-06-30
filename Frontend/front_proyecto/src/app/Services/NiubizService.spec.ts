import { TestBed } from '@angular/core/testing';

import { NiubizService } from './NiubizService';

describe('NiubizService', () => {
  let service: NiubizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiubizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
