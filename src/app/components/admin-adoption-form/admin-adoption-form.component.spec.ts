import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdoptionFormComponent } from './admin-adoption-form.component';

describe('AdminAdoptionFormComponent', () => {
  let component: AdminAdoptionFormComponent;
  let fixture: ComponentFixture<AdminAdoptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAdoptionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdoptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
