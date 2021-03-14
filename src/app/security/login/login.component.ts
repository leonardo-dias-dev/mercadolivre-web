import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Login} from '../../model/login';
import {ErrorHandlerService} from '../../core/service/error-handler.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService,
                private errorHandler: ErrorHandlerService,
                private router: Router) {
        if (!authService.isAccessTokenInvalido()) {
            this.router.navigate(['/produtos']);
        }
    }

    ngOnInit(): void {

    }

    public login(email: string, senha: string): void {
        const login = new Login(email, senha);

        this.authService.login(login)
            .then(() => {
               this.router.navigate(['/produtos']);
            }).catch(erro => this.errorHandler.handle(erro));
    }

}
