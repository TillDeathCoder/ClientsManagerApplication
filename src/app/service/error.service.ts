import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
import {ErrorDetailsComponent} from '../component/error/error-details/error-details.component';
import {Router} from '@angular/router';
import {Logger} from '../utils/logger';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                private router: Router,
                private logger: Logger) {
    }

    showError(message: String, reason) {
        this.logger.error(reason);
        const modalRef = this.modalService.open(ErrorDetailsComponent, {backdrop: 'static', keyboard: false});
        modalRef.componentInstance.message = message;
        modalRef.result.then((result) => {
            this.activeModal.close(result);
        }).catch(error => {
            this.logger.error(error);
            this.activeModal.dismiss();
        });

    }
}
