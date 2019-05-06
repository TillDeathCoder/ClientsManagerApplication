import {Component, OnInit} from '@angular/core';
import {CRUDService} from '../service/crud.service';
import {Client} from '../entity/client';
import {from} from 'rxjs';
import {ErrorService} from '../service/error.service';
import {environment} from '../../environments/environment';
import {ClientEditComponent} from '../client-edit/client-edit.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

@Component({
    selector: 'rp-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {

    clients: Client[] = [];
    page = 1;
    pageSize = 6;
    searchName: string;

    constructor(private crudService: CRUDService,
                private errorService: ErrorService, public activeModal: NgbActiveModal,
                private modalService: NgbModal) {
    }

    ngOnInit() {
        this.renderClients();
    }

    renderClients() {
        from(this.crudService.getAll(Client)).subscribe(result => {
            this.clients = result;
        }, error => {
            this.errorService.showError(environment.messages.errors.GET_ALL_CLIENTS_COMPONENT, error);
        });
    }

    addClient() {
        this.editClient(Client.getClientForCreate());
    }

    editClient(client: Client) {
        const modalRef = this.modalService.open(ClientEditComponent, {backdrop: 'static', keyboard: false});
        modalRef.componentInstance.client = _.cloneDeep(client);
        modalRef.result.then((result) => {
            if (result && result.isNew) {
                this.clients.push(result.client);
            }
            this.renderClients();
        }).catch(error => {
            this.errorService.showError(environment.messages.errors.CREATE_CLIENT_COMPONENT, error);
        });
    }

}
