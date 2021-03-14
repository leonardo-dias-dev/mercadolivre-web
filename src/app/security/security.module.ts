import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SecurityRoutingModule} from './security-routing.module';
import {LoginComponent} from './login/login.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthGuard} from './auth.guard';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MercadoLivreInterceptor} from './mercado-livre-interceptor';
import {AuthService} from './auth.service';

export function tokenGetter(): string {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        FormsModule,

        ButtonModule,
        InputTextModule,

        SecurityRoutingModule,

        JwtModule.forRoot({
            config: {
                tokenGetter,
                allowedDomains: ['localhost:8080'],
                disallowedRoutes: ['http://localhost:8080/authentication/login']
            }
        })
    ],
    providers: [
        AuthGuard,
        JwtHelperService,
        AuthService,
        {provide: HTTP_INTERCEPTORS, useClass: MercadoLivreInterceptor, multi: true}
    ]
})
export class SecurityModule {
}
