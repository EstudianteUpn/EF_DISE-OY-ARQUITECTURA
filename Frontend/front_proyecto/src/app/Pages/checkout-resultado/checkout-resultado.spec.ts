import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutResultado } from './checkout-resultado';

describe('CheckoutResultado', () => {
  let component: CheckoutResultado;
  let fixture: ComponentFixture<CheckoutResultado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutResultado],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutResultado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
