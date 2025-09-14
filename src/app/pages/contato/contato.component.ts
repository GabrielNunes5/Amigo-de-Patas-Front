import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Camera, Clock, DollarSign, Heart, LucideAngularModule, Mail, MapPin, Package, Phone, Stethoscope, Users } from 'lucide-angular';

interface FormaAjudar {
  icon: any;
  title: string;
  description: string;
  color: string;
}

interface Contato {
  icon: any;
  title: string;
  info: string;
  description: string;
}

@Component({
  selector: 'app-contato',
  imports: [CommonModule,LucideAngularModule, RouterLink],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {
  readonly Heart = Heart;
  readonly MapPin = MapPin;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Clock = Clock;
  readonly DollarSign = DollarSign;
  readonly Package = Package;
  readonly Stethoscope = Stethoscope;
  readonly Camera = Camera;
  readonly Users = Users;

  formasAjudar = signal<FormaAjudar[]>([
    {
      icon: Heart,
      title: "Adoção",
      description: "Dê um lar permanente a um de nossos amiguinhos",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: DollarSign,
      title: "Doação Financeira",
      description: "Ajude com custos veterinários, medicamentos e ração",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Package,
      title: "Doação de Itens",
      description: "Ração, medicamentos, casinhas, cobertores e brinquedos",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Stethoscope,
      title: "Serviços Veterinários",
      description: "Profissionais da saúde animal podem doar consultas",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Camera,
      title: "Fotografia",
      description: "Ajude fotografando nossos pets para adoção",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Users,
      title: "Trabalho Voluntário", 
      description: "Participe dos resgates, feiras de adoção e cuidados",
      color: "from-indigo-400 to-indigo-600"
    }
  ]);

  contatos = signal<Contato[]>([
    {
      icon: Phone,
      title: "Telefone",
      info: "(85) 99999-9999",
      description: "Atendimento de segunda a sexta, 9h às 18h"
    },
    {
      icon: Mail,
      title: "Email",
      info: "contato@amigodepatas.org.br",
      description: "Respondemos em até 24 horas"
    },
    {
      icon: MapPin,
      title: "Localização",
      info: "Fortaleza, CE",
      description: "Atuamos em toda região metropolitana"
    },
    {
      icon: Clock,
      title: "Horário de Visitas",
      info: "Sábados e Domingos",
      description: "Das 9h às 17h, com agendamento prévio"
    }
  ]);

  protected trackByIndex(index: number): number {
    return index;
  }
}
