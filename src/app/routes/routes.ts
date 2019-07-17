import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'cadastro', loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule) },
        ]
    },

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // Not found
    { path: '**', redirectTo: 'home' }

];
