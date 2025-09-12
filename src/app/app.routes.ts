import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AnimaisComponent } from './pages/animais/animais.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { AnimalDetalhesComponent } from './pages/animal-detalhes/animal-detalhes.component';

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
        path:"**",
        redirectTo: ""
    }
];
