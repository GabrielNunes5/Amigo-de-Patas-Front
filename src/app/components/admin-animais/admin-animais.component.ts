import { Component, signal, computed, input, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormsModule, NonNullableFormBuilder } from '@angular/forms';
import { LucideAngularModule, Search, Plus, Heart, Trash, Pencil, X, TriangleAlert } from 'lucide-angular';
import { Animal } from '../../models/animal.model';


type FilterStatus = 'todos' | 'Adotado' | 'Disponível';
type FilterTipo = 'todos' | 'Cachorro' | 'Gato';

@Component({
  selector: 'app-admin-animais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, FormsModule],
  templateUrl: './admin-animais.component.html',
  styleUrls: ['./admin-animais.component.css']
})
export class AdminAnimaisComponent {
  private fb = inject(NonNullableFormBuilder);

  readonly Search = Search;
  readonly Plus = Plus;
  readonly X = X;
  readonly Heart = Heart;
  readonly Trash = Trash;
  readonly Pencil = Pencil;
  readonly TriangleAlert = TriangleAlert;

  animais = input<Animal[]>([]);
  loading = input<boolean>(false);
  saving = input<boolean>(false);

  create = output<{ data: Partial<Animal>; images: File[] }>();
  update = output<{ id: string; data: Partial<Animal>; images: File[] }>();
  delete = output<string>();

  searchTerm = signal('');
  filterStatus = signal<FilterStatus>('todos');
  filterTipo = signal<FilterTipo>('todos');
  isFormOpen = signal(false);
  isDeleteOpen = signal(false);
  selectedAnimal = signal<Animal | null>(null);
  selectedImages = signal<File[]>([]);

  animalForm = this.fb.group({
    animalName: ['', [Validators.required, Validators.minLength(3)]],
    animalSpecies: ['', Validators.required],
    animalAge: ['', Validators.required],
    animalSex: ['', Validators.required],
    animalSize: ['', Validators.required],
    animalWeight: [1, [Validators.required, Validators.min(1)]],
    animalColor: [''],
    animalSpecialConditions: [''],
    animalAdopted: [false],
    animalNeutered: [false],
    animalVaccines: ['']
  });

  filteredAnimais = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const status = this.filterStatus();
    const tipo = this.filterTipo();

    return this.animais().filter(animal => {
      const matchSearch = !search || animal.animalName.toLowerCase().includes(search);
      const matchTipo = tipo === 'todos' || animal.animalSpecies?.toLowerCase() === tipo.toLowerCase();
      const matchStatus = status === 'todos' || 
        (status === 'Adotado' && animal.animalAdopted) || 
        (status === 'Disponível' && !animal.animalAdopted);

      return matchSearch && matchTipo && matchStatus;
    });
  });

  getStatusColor(adopted: boolean): string {
    return adopted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onFilterStatusChange(value: FilterStatus): void {
    this.filterStatus.set(value);
  }

  onFilterTipoChange(value: FilterTipo): void {
    this.filterTipo.set(value);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.selectedImages.set(Array.from(input.files));
  }

  openNewForm(): void {
    this.selectedAnimal.set(null);
    this.animalForm.reset({
      animalAdopted: false,
      animalNeutered: false
    });
    this.isFormOpen.set(true);
  }

  openEditForm(animal: Animal): void {
    this.selectedAnimal.set(animal);
    this.animalForm.patchValue(animal);
    this.isFormOpen.set(true);
  }

  openDeleteDialog(animal: Animal): void {
    this.selectedAnimal.set(animal);
    this.isDeleteOpen.set(true);
  }

  closeForm(): void {
    this.isFormOpen.set(false);
    this.selectedAnimal.set(null);
    this.animalForm.reset({
      animalAdopted: false,
      animalNeutered: false
    });
  }

  closeDeleteDialog(): void {
    this.isDeleteOpen.set(false);
    this.selectedAnimal.set(null);
  }

  handleSubmit(): void {
    if (this.animalForm.invalid) {
      this.animalForm.markAllAsTouched();
      return;
    }

    const data: Partial<Animal> = this.animalForm.value;
    const images = this.selectedImages();
    const selected = this.selectedAnimal();

    if (selected) {
      this.update.emit({
        id: selected.animalId,
        data,
        images: images
      });
    } else {
      this.create.emit({
        data,
        images: images
      });
    }

    this.closeForm();
  }

  handleDelete(): void {
    const animal = this.selectedAnimal();
    if (!animal) return;

    this.delete.emit(animal.animalId);
    this.closeDeleteDialog();
  }

  trackByAnimalId(_index: number, animal: Animal): string {
    return animal.animalId;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.animalForm.get(fieldName);
    return !!(field?.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.animalForm.get(fieldName);
    if (!field?.errors) return '';

    if (field.errors['required']) return 'Campo obrigatório';
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['min']) return 'Valor inválido';

    return 'Campo inválido';
  }

}