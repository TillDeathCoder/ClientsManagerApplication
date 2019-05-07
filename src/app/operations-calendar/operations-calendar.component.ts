import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {OperationDetailsComponent} from '../operation-details/operation-details.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OperationCalendarEventConverter} from '../utils/converter/operation-calendar-event-converter';
import {Operation} from '../entity/operation';
import * as _ from 'lodash';
import * as moment from 'moment';
import {isMoment} from 'moment';
import {OperationEditComponent} from '../operation-edit/operation-edit.component';
import {Options} from 'fullcalendar';
import {from} from 'rxjs';
import {environment} from '../../environments/environment';
import {ErrorService} from '../service/error.service';
import {CRUDService} from '../service/crud.service';

@Component({
    selector: 'rp-operations-calendar',
    templateUrl: './operations-calendar.component.html',
    styleUrls: ['./operations-calendar.component.css']
})

export class OperationsCalendarComponent implements OnInit {
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    calendarOptions: Options;
    events: any;

    constructor(private crudService: CRUDService,
                private modalService: NgbModal,
                public activeModal: NgbActiveModal,
                private operationCalendarEventConverter: OperationCalendarEventConverter,
                private errorService: ErrorService) {
    }

    ngOnInit() {
        // @ts-ignore
        this.calendarOptions = environment.calendar.configuration;
        this.renderEvents();
    }

    eventClick(model) {
        const modalRef = this.modalService.open(OperationDetailsComponent, {backdrop: 'static', keyboard: false});
        modalRef.componentInstance.operation = model;
        modalRef.result.then((result) => {
            if (result && result.isEdit) {
                this.activeModal.close(result);
                this.openEditModal(model);
            } else {
                this.renderEvents();
            }
        }).catch(error => {
            this.errorService.showError(environment.messages.errors.GET_OPERATION_COMPONENT, error);
        });
    }

    openEditModal(operation) {
        const modalRef = this.modalService.open(OperationEditComponent, {backdrop: 'static', keyboard: false});
        modalRef.componentInstance.operation = _.cloneDeep(operation);
        modalRef.result.then((result) => {
            this.activeModal.dismiss();
            this.renderEvents();
        }).catch(error => {
            this.errorService.showError(environment.messages.errors.EDIT_OPERATION_COMPONENT, error);
        });
    }

    renderEvents() {
        from(this.crudService.getAllWithJoin(Operation, {relations: ['client', 'operationType']}))
            .subscribe((data: Operation[]) => {
                this.events = this.operationCalendarEventConverter.convertArray(data);
            }, error => {
                this.errorService.showError(environment.messages.errors.GET_ALL__OPERATIONS_COMPONENT, error);
            });
    }

    createEvent(event) {
        if (isMoment(event) || (event.detail && event.detail.buttonType === 'createEventButton')) {
            let formattedDate = moment(new Date()).format(environment.formats.DATE_FORMAT);
            if (isMoment(event)) {
                formattedDate = moment(event).format(environment.formats.DATE_FORMAT);
            }
            this.openEditModal(Operation.getOperationForCreate(formattedDate));
        }
    }

    renderEvent(event) {
        console.log(event);
        const title = event.detail.element.text();
        console.log(title);
        event.detail.element.text('');
        event.detail.element.append('<i class="fas fa-ban"></i> ');
        event.detail.element.append(title);
    }
}
