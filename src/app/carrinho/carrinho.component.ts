import {Component, OnInit} from '@angular/core';
import {Carrinho} from '../model/carrinho';
import {LocalStorageUtil} from '../core/util/local-storage-util';
import {Produto} from '../model/produto';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-carrinho',
    templateUrl: './carrinho.component.html',
    styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

    public carrinho: Carrinho;

    public total: number;

    constructor(private localStorageUtil: LocalStorageUtil, private messageService: MessageService) {
        this.obterCarrinho();
        this.calcularValorTotal();
    }

    ngOnInit(): void {

    }

    public removerProduto(produto: Produto): void {
        const indexOf = this.carrinho.produtos.indexOf(produto, 0);
        if (indexOf <= -1) {
            return;
        }

        this.carrinho.produtos.splice(indexOf, 1);
        this.carrinho.quantidade--;

        this.localStorageUtil.add('carrinho', this.carrinho);

        this.obterCarrinho();
        this.calcularValorTotal();

        this.messageService.add({ severity: 'info', detail: `${produto.nome} removido do carrinho.` });
    }

    private obterCarrinho(): void {
        this.carrinho = this.localStorageUtil.get('carrinho');
    }

    private calcularValorTotal(): void {
        this.total = 0;
        this.carrinho.produtos.forEach(p => this.total += p.preco);
    }

}
