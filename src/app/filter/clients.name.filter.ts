import {Pipe, PipeTransform} from '@angular/core';
import {Client} from '../entity/client';

@Pipe({
    name: 'nameFilter',
    pure: false
})

export class ClientsNameFilter implements PipeTransform {
    transform(clients: Client[], name: string): any[] {
        if (!clients) {
            return [];
        }
        if (!name) {
            return clients;
        }

        name = name.toLowerCase();

        return clients.filter(client => {
            return client.firstName.toLowerCase().includes(name) || client.lastName.toLowerCase().includes(name);
        });
    }

}
