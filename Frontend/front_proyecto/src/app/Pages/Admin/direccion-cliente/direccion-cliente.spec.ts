import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DireccionCliente } from './direccion-cliente';

describe('DireccionCliente', () => {
  let component: DireccionCliente;
  let fixture: ComponentFixture<DireccionCliente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DireccionCliente],
    }).compileComponents();

    fixture = TestBed.createComponent(DireccionCliente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
