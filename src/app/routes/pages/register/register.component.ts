import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AutenticacaoService } from 'src/app/services/AutenticacaoService';

const swal = require('sweetalert');

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [AutenticacaoService]
})
export class RegisterComponent implements OnInit {

    valForm: FormGroup;
    passwordForm: FormGroup;

    constructor(public settings: SettingsService, fb: FormBuilder, private service: AutenticacaoService, private router: Router) {

        const password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        const certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.passwordForm = fb.group({
            password,
            confirmPassword: certainPassword
        });

        this.valForm = fb.group({
            username: [null, Validators.required],
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            accountagreed: [null, Validators.required],
            passwordGroup: this.passwordForm
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        // tslint:disable-next-line: forin
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }

        // tslint:disable-next-line: forin
        for (let c in this.passwordForm.controls) {
            this.passwordForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {
            console.log(value);
            this.RegistrarUsuario();
        }
    }

    RegistrarUsuario() {
        this.service.RegistrarUsuario(this.valForm.value)
            .subscribe(response => {
                this.router.navigate(['/login']);
            }, err => {
                this.sweetalertError(err.error);
            });
    }

    ngOnInit() {
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }

}
