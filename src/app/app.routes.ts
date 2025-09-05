import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AnimaisComponent } from './pages/animais/animais.component';
import { SobreComponent } from './pages/sobre/sobre.component';

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
        path:"sobre",
        component: SobreComponent
    }
];
