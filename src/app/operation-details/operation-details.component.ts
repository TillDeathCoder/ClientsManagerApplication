import {Component, Injectable, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Operation} from '../entity/operation';
import {environment} from '../../environments/environment';
import {CRUDService} from '../service/crud.service';
import {OperationCloseComponent} from '../operation-close/operation-close.component';
import {ErrorService} from '../service/error.service';
import * as _ from 'lodash';

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
                private crudService: CRUDService,
                private errorService: ErrorService) {
    }

    ngOnInit() {
    }

    async closeOperation() {
        const modalRef = this.modalService.open(OperationCloseComponent, {backdrop: 'static', keyboard: false});
        modalRef.componentInstance.operation = _.cloneDeep(this.operation);
        modalRef.result.then((result) => {
            this.activeModal.close(result);
        }).catch(error => {
            console.log(error);
            this.errorService.showError(environment.messages.errors.EDIT_OPERATION_COMPONENT, error);
        });
    }

    async cancelOperation() {
        this.operation.status = environment.operations.CANCELLED_STATUS;
        const result = await this.crudService.update(Operation, this.operation);
        this.activeModal.close(result);
    }

    openEditModal() {
        this.activeModal.close({isEdit: true});
    }

}
