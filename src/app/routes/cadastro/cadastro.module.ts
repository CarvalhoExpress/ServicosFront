import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services/auth.service';
import { NovoComponent } from './novo/novo.component';
import { FinalizarComponent } from './finalizar/finalizar.component';
import { ListarCadastrosPendentesComponent } from './listar_pendentes/listar_pendentes.component';
import { VisualizarComponent } from './visualizar/visualizar.component';

const routes: Routes = [
    { path: 'novo', component: NovoComponent },
    { path: 'finalizar', component: FinalizarComponent },
    { path: 'visualizar', component: VisualizarComponent, canActivate: [AuthService] },
    { path: 'listarcadastrospendentes', component: ListarCadastrosPendentesComponent, canActivate: [AuthService] }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        CustomFormsModule,
        FileUploadModule,
    ],
    declarations: [
        NovoComponent,
        FinalizarComponent,
        VisualizarComponent,
        ListarCadastrosPendentesComponent
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthService]
})
export class CadastroModule { }
