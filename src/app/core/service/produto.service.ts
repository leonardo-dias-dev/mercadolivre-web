import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Produto} from '../../model/produto';

@Injectable()
export class ProdutoService {

    private produtoUrl: string;

    constructor(private http: HttpClient) {
        this.produtoUrl = `${environment.api}/produtos`;
    }

    public listar(filtroNome: string): Promise<any> {
        let params = new HttpParams();

        if (filtroNome) {
            params = params.set('nome', filtroNome);
        }

        return this.http.get(this.produtoUrl, {params})
            .toPromise()
            .then(response => response);
    }

}
