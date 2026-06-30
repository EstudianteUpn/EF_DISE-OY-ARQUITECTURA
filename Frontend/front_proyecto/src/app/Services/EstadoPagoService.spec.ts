import { TestBed } from '@angular/core/testing';

import { EstadoPagoService } from './EstadoPagoService';

describe('EstadoPagoService', () => {
  let service: EstadoPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
