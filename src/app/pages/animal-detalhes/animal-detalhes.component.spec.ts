import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetalhesComponent } from './animal-detalhes.component';

describe('AnimalDetalhesComponent', () => {
  let component: AnimalDetalhesComponent;
  let fixture: ComponentFixture<AnimalDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalDetalhesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
