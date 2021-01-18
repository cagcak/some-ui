import { Injectable } from '@angular/core';
import { StorageEngine } from '@ngxs/storage-plugin';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements StorageEngine {
  get length(): number {
    return window.localStorage.length;
  }

  getItem(key: string | number): any {
    window.localStorage.getItem(String(key));
  }

  setItem(key: string | number, val: any): void {
    window.localStorage.setItem(String(key), val);
  }

  removeItem(key: string | number): void {
    window.localStorage.removeItem(String(key));
  }

  clear(): void {
    window.localStorage.clear();
  }

  key(index: number): string {
    return window.localStorage.key(index);
  }
}
