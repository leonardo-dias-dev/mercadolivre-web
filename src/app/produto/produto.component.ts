import {Component, OnInit} from '@angular/core';
import {ProdutoService} from '../core/service/produto.service';
import {Produto} from '../model/produto';
import {ErrorHandlerService} from '../core/service/error-handler.service';
import {ObjectUtils} from 'primeng/utils';
import {MessageService} from 'primeng/api';
import {Carrinho} from '../model/carrinho';
import {LocalStorageUtil} from '../core/util/local-storage-util';

@Component({
    selector: 'app-produto',
    templateUrl: './produto.component.html',
    styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

    public produtos: Produto[] = [];

    public carrinho: Carrinho;

    public filtroNome: string;

    constructor(private produtoService: ProdutoService,
                private errorHandler: ErrorHandlerService,
                private messageService: MessageService,
                private localStorageUtil: LocalStorageUtil) {
        this.carrinho = this.localStorageUtil.get('carrinho');

        this.pesquisar();
    }

    ngOnInit(): void {
    }

    public pesquisar(): void {
        this.produtoService.listar(this.filtroNome)
            .then(response => {
                this.produtos = response;
            }).catch(erro => this.errorHandler.handle(erro));
    }

    public adicionarAoCarrinho(produto: Produto): void {
        const existeNoCarrinho = this.jaExisteNoCarrinho(produto);
        if (existeNoCarrinho) {
            return;
        }

        this.carrinho.produtos.push(produto);
        this.carrinho.quantidade++;

        this.localStorageUtil.add('carrinho', this.carrinho);

        this.messageService.add({ severity: 'info', detail: `${produto.nome} adicionado ao carrinho.` });
    }

    private jaExisteNoCarrinho(produto: Produto): boolean {
        const produtoCarrinho: Produto = this.carrinho.produtos.find(p => p.id === produto.id);

        return produtoCarrinho !== null && produtoCarrinho !== undefined;
    }

}
