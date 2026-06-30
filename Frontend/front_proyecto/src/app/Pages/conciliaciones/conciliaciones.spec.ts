import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conciliaciones } from './conciliaciones';

describe('Conciliaciones', () => {
  let component: Conciliaciones;
  let fixture: ComponentFixture<Conciliaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conciliaciones],
    }).compileComponents();

    fixture = TestBed.createComponent(Conciliaciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
