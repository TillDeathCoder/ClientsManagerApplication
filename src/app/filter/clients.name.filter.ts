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
            const firstName = this.transforName(client.firstName);
            const lastName = this.transforName(client.lastName);
            return firstName.includes(name) || lastName.includes(name);
        });
    }

    private transforName(name) {
        return name ? name.toLowerCase() : '';
    }

}
