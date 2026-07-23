import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vcard } from './vcard';

describe('Vcard', () => {
  let component: Vcard;
  let fixture: ComponentFixture<Vcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vcard],
    }).compileComponents();

    fixture = TestBed.createComponent(Vcard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
