import { UUID } from 'angular2-uuid';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class StorageProvider {
    public dataSubject = new Subject<any[]>();
    public data;

    constructor(public storage: Storage) { }

    json(data) {
        return JSON.parse(data);
    }

    getDataList() {
        return new Promise((resolve) => {
            if (this.data) {
                resolve(JSON.stringify(this.data));
            } else {
                this.storage.get('myData').then((data) => {
                    this.data = data || JSON.stringify([]);
                    resolve(this.data);
                });
            }
        });
    }

    updateData(data: any[]) {
        this.data = data;
        this.dataSubject.next(data);
    }

    sort(data) {
        if (data.length > 1) {
            return data.sort((a: any, b: any) => {
                a = new Date(a.date);
                b = new Date(b.date);
                return a > b ? -1 : a < b ? 1 : 0;
            });
        } else {
            return data;
        }
    }

    list() {
        return this.getDataList().then(this.json).then(this.sort).then(data => this.updateData(data));
    }

    save(myData) {
        return this.getDataList().then(this.json).then(data => {
            let index = data.indexOf(data.find(item => item.id === myData.id));
            if (index !== -1) {
                // Already existing event
                data[index] = myData;
                return this.storage.set('myData', JSON.stringify(data)).then(() => this.updateData(this.sort(data)));
            } else {
                // New event
                data.push(myData);
                return this.storage.set('myData', JSON.stringify(data)).then(() => this.updateData(this.sort(data)));
            }
        });
    }

    delete(event) {
        return this.getDataList().then(this.json).then(this.sort).then(data => {
            let index = data.indexOf(data.find(item => item.id === event.id));
            if (index !== -1) {
                data.splice(index, 1);
                return this.storage.set('myData', JSON.stringify(data)).then(() => this.updateData(data));
            } else {
                throw new Error('Data not found');
            }
        });
    }
}
