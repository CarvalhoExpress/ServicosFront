import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../../../services/cadastro.service';
import { AprovacaoRequest } from '../../../models/aprovacao.model';
import { Router } from '@angular/router';

const swal = require('sweetalert');

@Component({
    selector: 'app-listar-pendentes',
    templateUrl: './listar_pendentes.component.html',
    styleUrls: ['./listar_pendentes.component.scss'],
    providers: [CadastroService]
})

export class ListarCadastrosPendentesComponent implements OnInit {

    cadastros: any = [];

    constructor(private service: CadastroService, private router: Router) { }


    ngOnInit() {
        this.BuscarCadastros();
    }

    IrParaVisualizacao(id: string, email: string) {
        this.router.navigate(['/cadastro/visualizar'],
            {
                queryParams: {
                    id,
                    email,
                }
            });
    }

    BuscarCadastros() {
        this.cadastros = [];
        this.service.BuscarCadastrosPendentes().subscribe((data: {}) => {
            console.log(data);
            this.cadastros = data;

            for (let i = 0, len = this.cadastros.length; i < len; i++) {
                this.cadastros[i].urlImage = this.service.VisualizarSelfie(this.cadastros[i].id);
            }
        });
    }

    AprovarCadastro(aprovacao: boolean, cadastro: any) {
        const obj: AprovacaoRequest = new AprovacaoRequest();
        obj.Id = cadastro.id;
        obj.Email = cadastro.email;
        obj.IntencaoDeAprovacao = aprovacao;

        this.service.AprovarCadastro(obj).subscribe((result) => {
            this.RemoverItemDaLista(cadastro);
        }, (err) => {
            this.sweetalertError(err.error);
        });
    }

    RemoverItemDaLista(cadastro: any) {
        const index = this.cadastros.indexOf(cadastro);
        if (index !== -1) {
            this.cadastros.splice(index, 1);
        }
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }
}
