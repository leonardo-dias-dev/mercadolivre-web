import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {NavbarComponent} from './navbar/navbar.component';
import {ProdutoService} from './service/produto.service';
import localePt from '@angular/common/locales/pt';
import {ErrorHandlerService} from './service/error-handler.service';
import {BadgeModule} from 'primeng/badge';
import {LocalStorageUtil} from './util/local-storage-util';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
    declarations: [NavbarComponent],
    imports: [
        CommonModule,
        RouterModule,

        HttpClientModule,
        BadgeModule
    ],
    exports: [
        NavbarComponent
    ],
    providers: [
        ProdutoService,
        ErrorHandlerService,
        LocalStorageUtil,

        MessageService,
        {provide: LOCALE_ID, useValue: 'pt-BR'}
    ]
})
export class CoreModule {
}
