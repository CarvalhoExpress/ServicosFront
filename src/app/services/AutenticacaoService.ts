import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Security } from 'src/app/utils/security.util';

const httpOptionsJson = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()

export class AutenticacaoService {

    private accessPointUrlProd = 'https://buscadoronline-back.azurewebsites.net/api';
    private accessPointUrlLocal = 'https://localhost:5001/api';

    constructor(private http: HttpClient) {
    }

    RealizarLogin(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.accessPointUrlLocal + '/Account',
            JSON.stringify(data), httpOptionsJson);
    }

    RegistrarUsuario(data: any): Observable<any> {
        console.log(data);
        return this.http.post(this.accessPointUrlLocal + '/Account/Registrar',
            JSON.stringify(data), httpOptionsJson);
    }

    logOut() {
        Security.clear();
    }


    private extractData(res: Response) {
        const body = res;
        return body || {};
    }
}
