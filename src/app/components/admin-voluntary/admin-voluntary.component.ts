import { Component, computed, input, output, signal } from '@angular/core';
import { Voluntary } from '../../models/voluntary.model';
import { AtSign, Eye, HeartIcon, LucideAngularModule, Phone, Search, Trash2Icon, UserIcon } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-voluntary',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './admin-voluntary.component.html',
  styleUrl: './admin-voluntary.component.css'
})
export class AdminVoluntaryComponent {
  readonly Search = Search;
  readonly HeartIcon = HeartIcon;
  readonly UserIcon = UserIcon;
  readonly Eye = Eye;
  readonly Trash2Icon = Trash2Icon;
  readonly AtSign = AtSign;
  readonly Phone = Phone;

  voluntaries = input<Voluntary[]>([]);
  loadingVoluntary = input<boolean>(false);
  savingVoluntary = input<boolean>(false);

  deleteVoluntary = output<string>();
  updateVoluntaryStatus = output<{ id: string, status: string }>();

  searchTerm = signal('');
  isViewOpen = signal(false);
  isDeleteOpen = signal(false);
  selectedVoluntary = signal<Voluntary | null>(null);
  selectedStatus = signal<string>('');

  filtredVoluntaries = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    return this.voluntaries().filter(voluntary => {
      const matchName = !search || voluntary.voluntaryName.toLowerCase().includes(search);
      return matchName;
    })
  })

  handleStatusChange(status: string): void {
    this.selectedStatus.set(status);
  }

  handleSaveStatus(): void {
    const voluntary = this.selectedVoluntary();
    if (!voluntary) return;
    this.updateVoluntaryStatus.emit({ 
        id: voluntary.voluntaryId, 
        status: this.selectedStatus() 
    });
    this.closeView();
  }
  
  handleDelete(): void {
    const voluntary = this.selectedVoluntary();
    if (!voluntary) return;

    this.deleteVoluntary.emit(voluntary.voluntaryId);
    this.closeDeleteDialog();
  }

  openView(voluntary: Voluntary): void {
    this.selectedVoluntary.set(voluntary);
    this.selectedStatus.set(voluntary.voluntaryStatus);
    this.isViewOpen.set(true);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  closeView(): void {
    this.isViewOpen.set(false);
  }

  openDeleteDialog(voluntary: Voluntary): void {
    this.selectedVoluntary.set(voluntary);
    this.isDeleteOpen.set(true);
  }

  closeDeleteDialog(): void {
    this.isDeleteOpen.set(false);
  }

  getVoluntaryStatus(status: string): string {
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

  getVoluntaryStatusClass(status: string): string {
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
