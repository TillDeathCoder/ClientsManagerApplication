import { Component, OnInit } from '@angular/core';
import {Operation} from '../entity/operation';
import {OperationService} from '../service/operation.service';
import {OperationEditComponent} from '../operation-edit/operation-edit.component';
import * as _ from 'lodash';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {from} from 'rxjs';

@Component({
  selector: 'app-operations-list',
  templateUrl: './operations-list.component.html',
  styleUrls: ['./operations-list.component.css']
})
export class OperationsListComponent implements OnInit {

  operations: Operation[] = [];
  page = 0;
  pageSize = 4;

  constructor(private operationService: OperationService,
              public activeModal: NgbActiveModal,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    from(this.operationService.getAllOperations()).subscribe(result => {
      this.operations = result;
    });
  }

  // TODO put id to function and the get operation from array
  async changeStatus(status: string, operation: Operation) {
    operation.status = status;
    const result = await this.operationService.updateOperation(operation);
    if (result === null) {
      // TODO add redirect to error page
    }
    this.activeModal.close(result);
  }

  // TODO put id to function and the get operation from array
  openEditModal(operation: Operation) {
    const modalRef = this.modalService.open(OperationEditComponent);
    modalRef.componentInstance.operation = _.cloneDeep(operation);
    modalRef.result.then((result) => {
      this.activeModal.close(result);
      this.reloadOperations();
    }).catch(error => {
      this.activeModal.close(error);
      // TODO redirect to error page
    });
  }

  reloadOperations() {
    from(this.operationService.getAllOperations()).subscribe((data: Operation[]) => {
      this.operations = data;
    });
  }
}
