import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()

export class PrestadorDeServicoService {

  private params: HttpParams;
  private accessPointUrlProd = 'https://servicos-com-backend.azurewebsites.net/api';
  private accessPointUrlLocal = 'https://localhost:5001/api';


  constructor(private http: HttpClient) {
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  BuscarPrestadoresDeServios(busca: string): Observable<any> {
    return this.http.get(this.accessPointUrlProd + '/PrestadorDeServico/ListarPrestadoresDeServicos', {
        params: {
          busca
        }
      }).pipe(map(this.extractData));
  }

  VisualizarDocumento(id): string {
    return this.accessPointUrlProd + '/Cadastro/VisualizarDocumento?Id=' + id;
  }

  VisualizarSelfie(id): string {
    return this.accessPointUrlProd + '/Cadastro/VisualizarSelfie?Id=' + id;
  }
}
