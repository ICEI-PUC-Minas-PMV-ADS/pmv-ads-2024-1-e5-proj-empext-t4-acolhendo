import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    private getPrefix() {
        return `acolhendo`;
    }

    private getKeyWithPrefix(key: string) {
        return `${this.getPrefix()}_${key}`;
    }

    get<T>(key: string): T {
        return (localStorage.getItem(this.getKeyWithPrefix(key)) || null) as T;
    }

    set(key: string, value: any): boolean {
        localStorage.setItem(this.getKeyWithPrefix(key), value);
        return true;
    }

    remove(key: string): boolean {
        localStorage.removeItem(this.getKeyWithPrefix(key));
        return true;
    }

    clearAll(): boolean {
        Object.keys(localStorage)
            .filter((key) => key.indexOf(this.getPrefix()) === 0)
            .forEach((key: string) => {
                this.remove(key);
            });
        return true;
    }

}