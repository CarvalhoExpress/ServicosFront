import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../../../services/cadastro.service';
import { AprovacaoRequest } from '../../../models/aprovacao.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

const swal = require('sweetalert');

@Component({
    selector: 'app-visualizar',
    templateUrl: './visualizar.component.html',
    styleUrls: ['./visualizar.component.scss'],
    providers: [CadastroService]
})

export class VisualizarComponent implements OnInit {

    id: string;
    email: string;
    cadastro: any;
    motoristaForm: FormGroup;
    public urlDocumento: any;
    public urlSelfie: any;

    constructor(private fb: FormBuilder, private service: CadastroService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.id = queryParams.id;
            }
        );
        this.BuscarCadastros();
        this.urlDocumento = this.service.VisualizarDocumento(this.id);
        this.urlSelfie = this.service.VisualizarSelfie(this.id);
    }

    BuscarCadastros() {
        this.service.BuscarCadastro(this.id).subscribe((data: {}) => {
            console.log(data);
            this.cadastro = data;
        });
    }

    AprovarCadastro(aprovacao: boolean) {
        // tslint:disable-next-line: prefer-const
        const obj: AprovacaoRequest = new AprovacaoRequest();
        obj.Id = this.cadastro.id;
        obj.Email = this.cadastro.email;
        obj.IntencaoDeAprovacao = aprovacao;

        this.service.AprovarCadastro(obj).subscribe((result) => {
            this.router.navigate(['/cadastro/listarcadastrospendentes']);
        }, (err) => {
            this.sweetalertError(err.error);
        });
    }

    VoltarParaVisualizcao() {
        this.router.navigate(['/cadastro/listarcadastrospendentes']);
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }
}
