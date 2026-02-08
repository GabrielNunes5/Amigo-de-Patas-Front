import { Component, signal, inject, effect, afterNextRender, DestroyRef, OnInit, computed } from '@angular/core';
import { AnimalService } from '../../service/animal/animal.service';
import { AdocaoFormData, Animal } from '../../models/animal.model';
import { AlertCircle, CheckCircle, Clock, Heart, LayoutDashboard, LucideAngularModule, PawPrint, Users } from 'lucide-angular';
import { AdminAnimaisComponent } from '../../components/admin-animais/admin-animais.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminAdoptionFormComponent } from "../../components/admin-adoption-form/admin-adoption-form/admin-adoption-form.component";
import { AdoptionFormService } from '../../service/adoptionForm/adoptionForm.service';
import { Voluntary } from '../../models/voluntary.model';
import { VoluntarioService } from '../../service/voluntario/voluntario.service';
import { AdminVoluntaryComponent } from '../../components/admin-voluntary/admin-voluntary/admin-voluntary.component';
import { CommonModule } from '@angular/common';

type AdminTab = 'dashboard' | 'animais' | 'adocoes' | 'voluntarios';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,LucideAngularModule, AdminAnimaisComponent, AdminAdoptionFormComponent, AdminVoluntaryComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  readonly PawPrint = PawPrint;
  readonly Heart = Heart;
  readonly Users = Users;
  readonly Clock = Clock;
  readonly CheckCircle = CheckCircle;
  readonly AlertCircle = AlertCircle;
  readonly LayoutDashboard = LayoutDashboard;
  
  private readonly animalService = inject(AnimalService);
  private readonly adoptionFormService = inject(AdoptionFormService);
  private readonly voluntaryService = inject(VoluntarioService);
  private readonly destroyRef = inject(DestroyRef);

  setTab(tab: AdminTab): void {
    this.activeTab.set(tab);
  }

  activeTab = signal<AdminTab>('dashboard');
  loading = signal(false);
  saving = signal(false);
  animais = signal<Animal[]>([]);
  adoptionForm = signal<AdocaoFormData[]>([]);
  voluntaries = signal<Voluntary[]>([]);

  animaisAdotados = computed(() =>
    this.animais().filter(a => a.animalAdopted)
  );

  ngOnInit(): void {
    this.loadAnimais();
    this.loadAdoptionForm();
    this.loadVoluntaries();
  }

  loadAnimais(): void {
    this.loading.set(true);

    this.animalService.getAnimals()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: list => this.animais.set(list),
        error: err => {
          console.error('Erro ao carregar animais', err);
          this.animais.set([]);
        },
        complete: () => this.loading.set(false),
      });
  }

  createAnimal(data: Partial<Animal>): void {
    this.saving.set(true);
    
    this.animalService.createAnimal(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: animal => {
          this.animais.update(list => [...list, animal]);
        },
        error: err => {
          console.error('Erro ao criar animal', err);
          // Adicionar toast/notificação
        },
        complete: () => this.saving.set(false)
      });
  }

  deleteAnimal(id: string): void {
    this.saving.set(true);
    
    this.animalService.deleteAnimal(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.animais.update(lista =>
            lista.filter(a => a.animalId !== id)
          );
        },
        error: err => {
          console.error('Erro ao deletar animal', err);
        },
        complete: () => this.saving.set(false)
      });
  }

  updateAnimal(payload: { id: string; data: Partial<Animal> }): void {
    this.saving.set(true);
    
    this.animalService.updateAnimal(payload.id, payload.data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: updated => {
          this.animais.update(list =>
            list.map(a => a.animalId === updated.animalId ? updated : a)
          );
        },
        error: err => {
          console.error('Erro ao atualizar animal', err);
        },
        complete: () => this.saving.set(false)
      });
  }

  loadAdoptionForm(): void {
    this.loading.set(true);

    this.adoptionFormService.getAdoptionForms()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: list => this.adoptionForm.set(list),
        error: err => {
          console.error('Erro ao carregar formulários de adoção', err);
          this.adoptionForm.set([]);
        },
        complete: () => this.loading.set(false),
      });
  }

  loadVoluntaries(): void {
    this.loading.set(true);

    this.voluntaryService.getVoluntaries()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: list => this.voluntaries.set(list),
        error: err => {
          console.error('Erro ao carregar voluntários', err);
          this.voluntaries.set([]);
        },
        complete: () => this.loading.set(false),
      })
  }
}