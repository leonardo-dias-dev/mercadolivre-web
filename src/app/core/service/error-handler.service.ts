import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {NotAuthenticatedError} from '../../security/mercado-livre-interceptor';
import {HttpErrorResponse} from '@angular/common/http';
import {ProblemDetail} from '../../model/ProblemDetail';

@Injectable()
export class ErrorHandlerService {

    constructor(private messageService: MessageService,
                private router: Router) { }

    public handle(errorResponse: any): void {
        if (errorResponse instanceof NotAuthenticatedError) {
            this.router.navigate(['/login']);
            return;
        }

        if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
            const httpErrorResponse: HttpErrorResponse = errorResponse as HttpErrorResponse;
            const problemDetail: ProblemDetail =  httpErrorResponse.error as ProblemDetail;

            this.showMessage(problemDetail.message);
            return;
        }

        this.showMessage('Erro ao processar serviço remoto. Tente novamente.');
    }

    private showMessage(message: string): void {
        this.messageService.add({ severity: 'error', detail: message });
    }

}
