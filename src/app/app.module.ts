import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SecurityModule} from './security/security.module';
import {CoreModule} from './core/core.module';
import {ProdutoComponent} from './produto/produto.component';
import {CarrinhoComponent} from './carrinho/carrinho.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {BadgeModule} from 'primeng/badge';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        ProdutoComponent,
        CarrinhoComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        CardModule,
        ButtonModule,
        ToastModule,
        TooltipModule,
        BadgeModule,
        InputTextModule,

        AppRoutingModule,

        SecurityModule,
        CoreModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
