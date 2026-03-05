import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsuccessComponent } from './donation-success.component';

describe('DonationsuccessComponent', () => {
  let component: DonationsuccessComponent;
  let fixture: ComponentFixture<DonationsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationsuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
