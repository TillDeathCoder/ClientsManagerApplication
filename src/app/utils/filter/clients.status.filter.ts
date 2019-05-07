import {Pipe, PipeTransform} from '@angular/core';
import {Client} from '../../entity/client';
import {environment} from '../../../environments/environment';

@Pipe({
    name: 'statusFilter'
})

export class ClientsStatusFilter implements PipeTransform {
    transform(clients: Client[], status: string): any[] {
        if (!clients) {
            return [];
        }
        if (!status) {
            status = environment.clients.ACTIVE_STATUS;
        }

        status = status.toLowerCase();

        return clients.filter(client => {
            return client.status.toLowerCase() === status;
        });
    }

}
