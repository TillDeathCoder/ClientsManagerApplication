import {Component, Injectable, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Operation} from '../entity/operation';
import {environment} from '../../environments/environment';
import {CRUDService} from '../service/crud.service';

@Component({
    selector: 'rp-operation-details',
    templateUrl: './operation-details.component.html',
    styleUrls: ['./operation-details.component.css']
})
@Injectable({
    providedIn: 'root'
})

export class OperationDetailsComponent implements OnInit {
    @Input() operation: Operation;

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal,
                private crudService: CRUDService) {
    }

    ngOnInit() {
    }

    async closeOperation() {
        await this.changeStatus(environment.operations.CLOSED_STATUS);
    }

    async cancelOperation() {
        await this.changeStatus(environment.operations.CANCELLED_STATUS);
    }

    async changeStatus(status: string) {
        this.operation.status = status;
        const result = await this.crudService.update(Operation, this.operation);
        this.activeModal.close(result);
    }

    openEditModal() {
        this.activeModal.close({isEdit: true});
    }

}
