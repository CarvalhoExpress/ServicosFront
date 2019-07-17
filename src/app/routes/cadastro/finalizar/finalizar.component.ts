import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroService } from '../../../services/cadastro.service';

const swal = require('sweetalert');

@Component({
    selector: 'app-finalizar',
    templateUrl: './finalizar.component.html',
    styleUrls: ['./finalizar.component.scss'],
    providers: [CadastroService]
})

export class FinalizarComponent implements OnInit {
    nome: any;
    sobrenome: any;
    email: any;
    telefone: any;
    cidade: any;
    servico: any;

    cadastroForm: FormGroup;
    cadastro: any;
    id = '0';

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private service: CadastroService) {

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

    carregarGroup() {
        this.cadastroForm = this.fb.group({
            Nome: [this.nome, Validators.compose([Validators.required, Validators.minLength(5)])],
            Sobrenome: [this.sobrenome, Validators.compose([Validators.required, Validators.minLength(5)])],
            Telefone: [this.telefone, Validators.compose([Validators.required, CustomValidators.number])],
            Email: [this.email, Validators.compose([Validators.required, CustomValidators.email])],
            Cep: [null, Validators.compose([Validators.required, CustomValidators.numer,
            Validators.minLength(8), Validators.maxLength(8)])],
            Rua: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            Numero: [null, Validators.compose([Validators.required, CustomValidators.number])],
            Bairro: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            Cidade: [this.cidade, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(150)])],
            Rg: [null, Validators.compose([Validators.required, CustomValidators.numer,
            Validators.minLength(2), Validators.maxLength(15)])],
            Cpf: [null, Validators.compose([Validators.required, CustomValidators.numer,
            Validators.minLength(11), Validators.maxLength(11)])],
            Servico: [this.servico, Validators.compose([Validators.required])],
            Documento: [null],
            Selfie: [null]
        });
    }

    onDocumentoSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.cadastroForm.get('Documento').setValue(file);
            console.log(file);
        }
    }

    onSelfieSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.cadastroForm.get('Selfie').setValue(file);
            console.log(file);
        }
    }

    BuscarCadastros() {
        this.service.BuscarCadastro(this.id).subscribe((data: {}) => {
            this.cadastro = data;
            this.carregarGroup();
        });
    }

    SubmeterCadastro() {
        this.router.navigate(['/home']);

        const formData = new FormData();
        formData.append('Nome', this.cadastroForm.get('Nome').value);
        formData.append('Sobrenome', this.cadastroForm.get('Sobrenome').value);
        formData.append('Telefone', this.cadastroForm.get('Telefone').value);
        formData.append('Email', this.cadastroForm.get('Email').value);
        formData.append('Cep', this.cadastroForm.get('Cep').value);
        formData.append('Rua', this.cadastroForm.get('Rua').value);
        formData.append('Numero', this.cadastroForm.get('Numero').value);
        formData.append('Bairro', this.cadastroForm.get('Bairro').value);
        formData.append('Cidade', this.cadastroForm.get('Cidade').value);
        formData.append('Rg', this.cadastroForm.get('Rg').value);
        formData.append('Cpf', this.cadastroForm.get('Cpf').value);
        formData.append('Cidade', this.cadastroForm.get('Cidade').value);
        formData.append('Servico', this.cadastroForm.get('Servico').value);
        formData.append('Documento', this.cadastroForm.get('Documento').value);
        formData.append('Selfie', this.cadastroForm.get('Selfie').value);
        console.log(formData);
        this.service.FinalizarCadastro(formData)
            .subscribe((result) => {
                this.router.navigate(['/home']);
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
        this.route.queryParams.subscribe(
            (queryParams: any) => {
                this.nome = queryParams.nome;
                this.sobrenome = queryParams.sobrenome;
                this.email = queryParams.email;
                this.telefone = queryParams.telefone;
                this.cidade = queryParams.cidade;
                this.servico = queryParams.servico;
            }
        );
        this.carregarGroup();
    }

}
