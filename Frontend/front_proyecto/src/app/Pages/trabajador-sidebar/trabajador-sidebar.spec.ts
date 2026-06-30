import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorSidebar } from './trabajador-sidebar';

describe('TrabajadorSidebar', () => {
  let component: TrabajadorSidebar;
  let fixture: ComponentFixture<TrabajadorSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabajadorSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(TrabajadorSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
