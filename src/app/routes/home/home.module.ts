import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CustomFormsModule } from 'ng2-validation';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        SharedModule,
        CustomFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
