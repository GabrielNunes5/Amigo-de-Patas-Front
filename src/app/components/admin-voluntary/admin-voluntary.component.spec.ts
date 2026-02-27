import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVoluntaryComponent } from './admin-voluntary.component';

describe('AdminVoluntaryComponent', () => {
  let component: AdminVoluntaryComponent;
  let fixture: ComponentFixture<AdminVoluntaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVoluntaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVoluntaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
