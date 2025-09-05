import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Award, Heart, Lightbulb, LucideAngularModule, Shield, Target, Users } from 'lucide-angular';

@Component({
  selector: 'app-sobre',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class SobreComponent {
  readonly Heart = Heart;
  readonly Award = Award;
  readonly Target = Target;
  readonly Lightbulb = Lightbulb;
  readonly Shield = Shield;
  readonly Users = Users;

  valores = [
    {
      icon: Heart,
      title: "Amor Incondicional",
      description: "Acreditamos que todo animal merece amor, cuidado e uma segunda chance de ser feliz."
    },
    {
      icon: Shield,
      title: "Adoção Responsável", 
      description: "Garantimos que cada adoção seja feita com responsabilidade e preparação adequada."
    },
    {
      icon: Users,
      title: "Comunidade Unida",
      description: "Construímos uma rede de pessoas comprometidas com o bem-estar animal."
    },
    {
      icon: Lightbulb,
      title: "Educação e Consciência",
      description: "Promovemos a educação sobre posse responsável e direitos dos animais."
    }
  ];

  equipe = [
    {
      nome: "Ana Silva",
      cargo: "Fundadora e Presidente",
      foto: "https://img.freepik.com/fotos-gratis/retrato-de-mulher-senior-elegante-sorridente_23-2149038116.jpg",
      descricao: "Veterinária com 15 anos de experiência, fundou a ONG após resgatar mais de 200 animais."
    },
    {
      nome: "Carlos Santos", 
      cargo: "Coordenador de Resgates",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      descricao: "Especialista em resgates urbanos, já salvou centenas de animais em situação de risco."
    },
    {
      nome: "Maria Oliveira",
      cargo: "Coordenadora de Adoções", 
      foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      descricao: "Psicóloga especializada em comportamento animal, garante matches perfeitos entre pets e famílias."
    }
  ];
}
