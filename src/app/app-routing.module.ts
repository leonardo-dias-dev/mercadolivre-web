import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProdutoComponent} from './produto/produto.component';
import {CarrinhoComponent} from './carrinho/carrinho.component';

const routes: Routes = [
    { path: 'produtos', component: ProdutoComponent},
    { path: 'carrinho', component: CarrinhoComponent},

    {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
