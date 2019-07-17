import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrestadorDeServicoService } from '../../../services/prestador_de_servico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [PrestadorDeServicoService]
})
export class HomeComponent implements OnInit {

    buscaForm: FormGroup;
    cadastros: any = [];
    servicos = ['Eletricista', 'Frete', 'Chaveiro', 'Técnico em Informática', 'Designer', 'Projetista', 'Programador'];

    constructor(private fb: FormBuilder, private router: Router, private service: PrestadorDeServicoService) {
        this.buscaForm = this.fb.group({
            busca: ['a', Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {
        this.BuscarPrestadoresDeServicos('a');
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.buscaForm.controls) {
            this.buscaForm.controls[c].markAsTouched();
        }

        if (this.buscaForm.valid) {
            this.BuscarPrestadoresDeServicos(this.buscaForm.get('busca').value);
        }
    }


    BuscarPrestadoresDeServicos(busca: string) {
        this.cadastros = [];
        this.service.BuscarPrestadoresDeServios(busca).subscribe((data: {}) => {
            console.log(data);
            this.cadastros = data;

            for (let i = 0, len = this.cadastros.length; i < len; i++) {
                this.cadastros[i].urlImage = this.service.VisualizarSelfie(this.cadastros[i].id);
            }
        });
    }

    IrParaConhecaMais() {
        this.router.navigate(['/']);
    }

    IrParaCadastroDePrestador() {
        this.router.navigate(['/cadastro/novo']);
    }

}
