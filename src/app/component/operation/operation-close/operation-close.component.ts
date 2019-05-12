import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl} from '@angular/forms';
import {Operation} from '../../../entity/operation';
import {isNumber} from 'util';
import {CRUDService} from '../../../service/crud.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'rp-operation-close',
    templateUrl: './operation-close.component.html',
    styleUrls: ['./operation-close.component.scss']
})
export class OperationCloseComponent implements OnInit {

    @Input() operation: Operation;
    priceControl: FormControl;
    priceStatus = true;

    constructor(public activeModal: NgbActiveModal,
                private crudService: CRUDService) {
    }

    ngOnInit() {
        this.priceControl = new FormControl(this.operation.price, (control: FormControl) => {
            const value = control.value;
            if (!value) {
                this.priceStatus = false;
                return {
                    invalidFormat: true
                };
            }

            if (isNumber(value)) {
                if (value > 0) {
                    this.priceStatus = true;
                    this.operation.price = value;
                    return null;
                }
            }

            this.priceStatus = false;
            return {
                invalidFormat: true
            };
        });

    }

   async save() {
        this.operation.status = environment.operations.CLOSED_STATUS;
        const result = await this.crudService.update(Operation, this.operation);
        this.activeModal.close(result);
    }
}
