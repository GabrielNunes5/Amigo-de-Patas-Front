import { Component, computed, input, output, signal } from '@angular/core';
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
  readonly Search = Search;
  readonly HeartIcon = Heart;
  readonly UserIcon = User;
  readonly PawPrintIcon = PawPrint;
  readonly Eye = Eye;
  readonly Trash2Icon = Trash2;
  readonly HomeIcon = Home;
  
  adoptionForm = input<AdocaoFormData[]>([]);
  loadingAdoptionForm = input<boolean>(false);
  savingAdoptionForm = input<boolean>(false);

  deleteAdoptionForm = output<string>();
  updateStatusAdoptionForm = output<{ id: string, status: string }>();

  searchTerm = signal('');
  isViewOpen = signal(false);
  isDeleteOpen = signal(false);
  selectedAdoptions = signal<AdocaoFormData | null>(null);
  selectedStatus = signal<string>('');

  filteredAdoptions = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    return this.adoptionForm().filter(adocao => {
      const matchAnimalName = !search || adocao.animalName.toLowerCase().includes(search);
      const matchAdopterName = !search || adocao.adopterName.toLowerCase().includes(search);
      return matchAnimalName || matchAdopterName;
    })
  })

  handleSaveStatus(): void {
    const adoption = this.selectedAdoptions();
    if (!adoption) return;
    this.updateStatusAdoptionForm.emit({ 
        id: adoption.formId, 
        status: this.selectedStatus() 
    });
    this.closeView();
  }

  openView(adoptions: AdocaoFormData): void {
    this.selectedAdoptions.set(adoptions);
    this.selectedStatus.set(adoptions.status);
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
    const adoption = this.selectedAdoptions();
    if (!adoption) return;
    this.deleteAdoptionForm.emit(adoption.formId);
    this.closeDeleteDialog();
  }

  handleStatusChange(status: string): void {
    this.selectedStatus.set(status);
  }

  getAdoptionFormStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Pendente';
      case 'APPROVED':
        return 'Aprovado';
      case 'REJECTED':
        return 'Rejeitado';
      default:
        return status;
    }
  }

  getAdoptionFormStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'px-6 py-4 whitespace-nowrap text-yellow-700';
      case 'APPROVED':
        return 'px-6 py-4 whitespace-nowrap text-green-700';
      case 'REJECTED':
        return 'px-6 py-4 whitespace-nowrap text-red-700';
      default:
        return '';
    }
  }
}
