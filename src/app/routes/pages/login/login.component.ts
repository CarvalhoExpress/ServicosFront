import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Security } from 'src/app/utils/security.util';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../../services/AutenticacaoService';

const swal = require('sweetalert');

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [AutenticacaoService]
})

export class LoginComponent implements OnInit {

    valForm: FormGroup;

    constructor(public settings: SettingsService, fb: FormBuilder, private router: Router, private service: AutenticacaoService) {

        this.valForm = fb.group({
            email: [null, Validators.compose([Validators.required, CustomValidators.email])],
            password: [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();

        // tslint:disable-next-line: forin
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {
            console.log(value);
            this.submit();
        }
    }

    submit() {
        this.service.RealizarLogin(this.valForm.value)
            .subscribe((data: any) => {
                console.log(data);
                this.setUser(data.user, data.token);
                this.router.navigate(['/home']);
            },
                (err) => {
                    this.sweetalertError(err.error);
                }
            );
    }

    ngOnInit() {
    }

    setUser(user, token) {
        Security.set(user, token);
        this.router.navigate(['/']);
    }

    sweetalertError(message: string) {
        swal({
            title: 'Opss!',
            text: message,
            icon: 'warning'
        });
    }

}
