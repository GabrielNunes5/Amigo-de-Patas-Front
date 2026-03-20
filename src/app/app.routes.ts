import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AnimaisComponent } from './pages/animais/animais.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { AnimalDetalhesComponent } from './pages/animal-detalhes/animal-detalhes.component';
import { VoluntarioComponent } from './pages/voluntario/voluntario.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { adminGuard } from './_guard/admin-guard.guard';
import { DonationComponent } from './pages/donation/donation.component';

export const routes: Routes = [
    {
        path:"",
        component: HomeComponent
    },
    {
        path:"contato",
        component: ContatoComponent
    },
    {
        path:"animais", 
        component: AnimaisComponent
    },
    {
        path:"animal/:id",
        component: AnimalDetalhesComponent
    },
    {
        path:"sobre",
        component: SobreComponent
    },
    {
        path:"voluntario",
        component: VoluntarioComponent
    },
    {
        path:"doacao",
        component: DonationComponent
    },
    {
        path:"auth",
        children: [
            {path: 'login', component: LoginComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },
            {path: 'reset-password', loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent) }
        ]
    },
    {
        path:"admin",
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
    },
    {
        path:"donation/success",
        loadComponent: () => import('./pages/donation/donation-success/donation-success.component').then(m => m.DonationsuccessComponent)
    },
    {
        path:"donation/cancel",
        loadComponent: () => import('./pages/donation/donation-cancel/donation-cancel.component').then(m => m.DonationCancelComponent)
    },
    {
        path:"termos",
        loadComponent: () => import('./pages/terms/terms.component').then(m => m.TermsComponent)
    },
    {
        path:"privacidade",
        loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
    },
    {
        path:"**",
        redirectTo: ""
    }
];
