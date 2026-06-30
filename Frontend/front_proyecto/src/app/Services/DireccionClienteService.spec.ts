import { TestBed } from '@angular/core/testing';

import { DireccionClienteService } from './DireccionClienteService';

describe('DireccionClienteService', () => {
  let service: DireccionClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccionClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
