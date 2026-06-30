import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientosBanc } from './movimientos-banc';

describe('MovimientosBanc', () => {
  let component: MovimientosBanc;
  let fixture: ComponentFixture<MovimientosBanc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimientosBanc],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientosBanc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
