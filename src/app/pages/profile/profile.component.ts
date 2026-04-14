import { Component, inject, OnInit, signal } from '@angular/core';
import { CheckCheck, CheckCircle, ClipboardList, Clock, Edit3, Heart, LucideAngularModule, Mail, MapPin, Phone, Save, User, XCircle, } from 'lucide-angular';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type ProfileTabs =  'dados' | 'adocoes' | 'animais';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  readonly User = User;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Edit3 = Edit3;
  readonly ClipboardList = ClipboardList;
  readonly Heart = Heart;
  readonly Save = Save;
  readonly CheckCircle = CheckCircle;
  readonly Clock = Clock;
  readonly XCircle = XCircle;
  readonly CheckCheck = CheckCheck;

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  readonly currentUser = this.auth.user;

  loading = signal(false);
  save = signal(false);
  saving = signal(false);
  activeTab = signal<ProfileTabs>('dados');

  setTab(tab: ProfileTabs): void {
    this.activeTab.set(tab);
  }

  readonly profileForm = this.fb.group({
    adopterPhone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    adopterAddress: ['', [Validators.required]],
    typeHouse: ['', [Validators.required]],
    hasGarden: [false]
  })

  private readonly STATUS_CONFIG: Record<string, { label: string; color: string }> = {
    pendente:   { label: 'Pendente',    color: 'bg-amber-50 text-amber-600 border-amber-200' },
    em_analise: { label: 'Em análise',  color: 'bg-blue-50 text-blue-600 border-blue-200' },
    "APPROVED":   { label: 'Aprovado',    color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    recusado:   { label: 'Recusado',    color: 'bg-red-50 text-red-500 border-red-200' },
  };

  ngOnInit(): void {
    const user = this.currentUser();

    this.profileForm.patchValue({
      adopterPhone:   user?.adopterPhone   ?? '',
      adopterAddress: user?.adopterAddress ?? '',
      typeHouse:      user?.typeHouse      ?? '',
      hasGarden:      user?.hasGarden      ?? false,
    });

  }

  saveProfile(): void {
    console.log(this.profileForm.value);
  }

  tabClass(tab: string): string {
    const base = 'flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-sm cursor-pointer font-semibold transition-all';
    return this.activeTab() === tab
      ? `${base} bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-md shadow-blue-100`
      : `${base} text-slate-500 hover:text-slate-700 hover:bg-slate-50`;
  }

  saveButtonClass(): string {
    const base = 'w-full py-3 rounded-2xl font-bold text-white text-sm transition-all duration-300 disabled:opacity-70';
    return this.save()
      ? `${base} bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-100`
      : `${base} bg-gradient-to-r from-blue-500 to-emerald-500 hover:opacity-90 shadow-lg shadow-blue-100`;
  }

  statusBadgeClass(status: string): string {
    const cfg = this.STATUS_CONFIG[status] ?? this.STATUS_CONFIG['pendente'];
    return `text-xs font-semibold px-3 py-1.5 rounded-full border flex-shrink-0 ${cfg.color}`;
  }

  getStatusLabel(status: string): string {
    return this.STATUS_CONFIG[status]?.label ?? 'Pendente';
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  }

}
