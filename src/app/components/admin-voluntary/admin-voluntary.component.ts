import { Component, computed, input, signal } from '@angular/core';
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
  voluntaries = input<Voluntary[]>([]);
  loading = input<boolean>(false);

  readonly Search = Search;
  readonly HeartIcon = HeartIcon;
  readonly UserIcon = UserIcon;
  readonly Eye = Eye;
  readonly Trash2Icon = Trash2Icon;
  readonly AtSign = AtSign;
  readonly Phone = Phone;

  searchTerm = signal('');
  isViewOpen = signal(false);
  isDeleteOpen = signal(false);
  selectedVoluntary = signal<Voluntary | null>(null);

  filtredVoluntaries = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();

    return this.voluntaries().filter(voluntary => {
      const matchName = !search || voluntary.voluntaryName.toLowerCase().includes(search);
      return matchName;
    })
  })

  
  openView(voluntary: Voluntary): void {
    this.selectedVoluntary.set(voluntary);
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

    handleDelete(): void {
    this.closeDeleteDialog();
  }
}
