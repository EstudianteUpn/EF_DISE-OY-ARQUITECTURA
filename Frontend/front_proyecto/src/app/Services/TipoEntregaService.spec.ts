import { TestBed } from '@angular/core/testing';

import { TipoEntregaService } from './TipoEntregaService';

describe('TipoEntregaService', () => {
  let service: TipoEntregaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEntregaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
