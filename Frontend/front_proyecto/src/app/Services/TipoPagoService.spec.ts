import { TestBed } from '@angular/core/testing';

import { TipoPagoService } from './TipoPagoService';

describe('TipoPagoService', () => {
  let service: TipoPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
