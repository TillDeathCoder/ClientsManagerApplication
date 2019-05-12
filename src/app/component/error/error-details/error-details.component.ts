import {Component, Injectable, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'rp-error-details',
    templateUrl: './error-details.component.html',
    styleUrls: ['./error-details.component.scss']
})
@Injectable({
    providedIn: 'root'
})

export class ErrorDetailsComponent implements OnInit {
    @Input() message: String;

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    closeErrorMessage() {
        this.activeModal.dismiss();
    }

}
