import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Telefono } from './telefono';

describe('Telefono', () => {
  let component: Telefono;
  let fixture: ComponentFixture<Telefono>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Telefono],
    }).compileComponents();

    fixture = TestBed.createComponent(Telefono);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
