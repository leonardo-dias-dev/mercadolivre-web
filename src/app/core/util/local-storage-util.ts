import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageUtil {

    public add(key: string, value: any): void {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }

    public get(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }

}
