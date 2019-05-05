import {Component, Injectable, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Operation} from '../entity/operation';
import {OperationService} from '../service/operation.service';
import {OperationEditComponent} from '../operation-edit/operation-edit.component';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';

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
              private operationService: OperationService) {
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
    const result = await this.operationService.updateOperation(this.operation);
    if (result === {}) {
      // TODO add redirect to error page
    }
    this.activeModal.close(result);
  }

  openEditModal() {
    // TODO move this logic to calendar

    const modalRef = this.modalService.open(OperationEditComponent);
    modalRef.componentInstance.operation = _.cloneDeep(this.operation);
    modalRef.result.then((result) => {
      this.activeModal.close(result);
    }).catch(error => {
      this.activeModal.close(error);
      // TODO redirect to error page
    });
  }

}
