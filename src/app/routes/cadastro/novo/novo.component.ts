import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro.service';

const swal = require('sweetalert');

@Component({
    selector: 'app-cadastro',
    templateUrl: './novo.component.html',
    styleUrls: ['./novo.component.scss'],
    providers: [CadastroService]
})

export class NovoComponent implements OnInit {

    messageAlert: string;
    cadastroForm: FormGroup;

    constructor(private fb: FormBuilder, private service: CadastroService, private router: Router) {
        this.cadastroForm = fb.group({
            Nome: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            Sobrenome: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            Telefone: [null, Validators.compose([Validators.required, CustomValidators.number])],
            Email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            Cidade: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            Servico: [null, Validators.compose([Validators.required])],
            Check: [null, Validators.required]
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.cadastroForm.controls) {
            this.cadastroForm.controls[c].markAsTouched();
        }

        if (this.cadastroForm.valid) {
            this.SubmeterCadastro();
        }
    }

    SubmeterCadastro() {

        this.service.SolicitarCadastro(this.cadastroForm.value)
            .subscribe((result) => {
                this.router.navigate(['/cadastro/finalizar'],
                {
                    queryParams: {
                        nome: this.cadastroForm.controls.Nome.value,
                        sobrenome: this.cadastroForm.controls.Sobrenome.value,
                        email: this.cadastroForm.controls.Email.value,
                        telefone: this.cadastroForm.controls.Telefone.value,
                        cidade: this.cadastroForm.controls.Cidade.value,
                        servico: this.cadastroForm.controls.Servico.value
                    }
                });
            }, (err) => {
                this.sweetalertError(err.error);
            });
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }

    ngOnInit() {
        if (this.messageAlert) {
            this.sweetalertError('teste');
        }
    }

}
