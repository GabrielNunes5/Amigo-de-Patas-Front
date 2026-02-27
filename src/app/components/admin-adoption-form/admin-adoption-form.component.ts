import { Component, computed, input, signal } from '@angular/core';
import { AdocaoFormData } from '../../models/animal.model';
import { CommonModule } from '@angular/common';
import { Eye, Heart, Home, LucideAngularModule, PawPrint, Search, Trash2, User } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-adoption-form',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './admin-adoption-form.component.html',
  styleUrl: './admin-adoption-form.component.css'
})
export class AdminAdoptionFormComponent {
  adoptionForm = input<AdocaoFormData[]>([]);
  loading = input<boolean>(false);

  readonly Search = Search;
  readonly HeartIcon = Heart;
  readonly UserIcon = User;
  readonly PawPrintIcon = PawPrint;
  readonly Eye = Eye;
  readonly Trash2Icon = Trash2;
  readonly HomeIcon = Home;

  searchTerm = signal('');
  isViewOpen = signal(false);
  isDeleteOpen = signal(false);
  selectedAdoptions = signal<AdocaoFormData | null>(null);

  filteredAdoptions = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    return this.adoptionForm().filter(adocao => {
      const matchAnimalName = !search || adocao.animalName.toLowerCase().includes(search);
      const matchAdopterName = !search || adocao.adopterName.toLowerCase().includes(search);
      return matchAnimalName || matchAdopterName;
    })
  })

  openView(adoptions: AdocaoFormData): void {
    this.selectedAdoptions.set(adoptions);
    this.isViewOpen.set(true);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  closeView(): void {
    this.isViewOpen.set(false);
  }

  openDeleteDialog(adoptions: AdocaoFormData): void {
    this.selectedAdoptions.set(adoptions);
    this.isDeleteOpen.set(true);
  }

  closeDeleteDialog(): void {
    this.isDeleteOpen.set(false);
  }

  handleDelete(): void {
    this.closeDeleteDialog();
  }
}
