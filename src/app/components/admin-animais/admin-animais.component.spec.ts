import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnimaisComponent } from './admin-animais.component';

describe('AdminAnimaisComponent', () => {
  let component: AdminAnimaisComponent;
  let fixture: ComponentFixture<AdminAnimaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAnimaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
