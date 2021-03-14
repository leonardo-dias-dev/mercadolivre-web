import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

export class NotAuthenticatedError {}

@Injectable()
export class MercadoLivreInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('MercadoLivreInterceptora');

        if (!req.url.includes('/authentication') && this.authService.isAccessTokenInvalido()) {
            throw new NotAuthenticatedError();
        }

        if (!this.authService.isAccessTokenInvalido()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            return next.handle(req);
        }

        return next.handle(req);
    }

}
