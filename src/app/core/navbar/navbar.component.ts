import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Carrinho} from '../../model/carrinho';
import {LocalStorageUtil} from '../util/local-storage-util';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private router: Router, private localStorageUtil: LocalStorageUtil) {
    }

    ngOnInit(): void {
    }

    public sair(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('carrinho');

        this.router.navigate(['/login']);
    }

    get quantidadeCarrinho(): string {
        const carrinho: Carrinho = this.localStorageUtil.get('carrinho');

        return carrinho !== null && carrinho !== undefined ? carrinho.quantidade.toString() : '0';
    }

}
