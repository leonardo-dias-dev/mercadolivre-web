import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';
import {Login} from '../model/login';
import {Carrinho} from '../model/carrinho';
import {LocalStorageUtil} from '../core/util/local-storage-util';

@Injectable()
export class AuthService {

    public jwtPayload: any;

    private loginUrl;

    constructor(private http: HttpClient,
                private jwtHelper: JwtHelperService,
                private localStorageUtil: LocalStorageUtil) {
        this.loginUrl = `${environment.api}/authentication/login`;

        this.carregarToken();
    }

    public login(login: Login): Promise<void> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json');

        return this.http.post(this.loginUrl, login, { headers, withCredentials: true })
            .toPromise()
            .then(response => {
                this.armazenarToken(response['token']);
                this.localStorageUtil.add('carrinho', new Carrinho());
            })
            .catch(response => {
                if (response.status === 400 && response.error.error === 'invalid_grant') {
                    return Promise.reject('Usuário ou senha inválida!');
                }

                return Promise.reject(response);
            });
    }

    private armazenarToken(token: string): void {
        this.jwtPayload = this.jwtHelper.decodeToken(token);

        this.localStorageUtil.add('token', token);
    }

    private carregarToken(): void {
        const token: string = localStorage.getItem('token');

        if (token !== null && token !== undefined) {
            this.armazenarToken(token);
        }
    }

    public isAccessTokenInvalido(): boolean {
        const token: string = localStorage.getItem('token');

        return token === null || token === undefined || this.jwtHelper.isTokenExpired(token);
    }

}
