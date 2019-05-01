import {Component, OnInit, ViewChild} from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import {OperationDetailsComponent} from '../operation-details/operation-details.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OperationCalendarEventConverter} from '../utils/operation-calendar-event-converter';
import {OperationService} from '../service/operation.service';
import {Operation} from '../entity/operation';
import {ClientsManagerLogger} from '../utils/clients-manager-logger';
import * as _ from 'lodash';
import {OperationEditComponent} from '../operation-edit/operation-edit.component';
import {from} from 'rxjs';

@Component({
  selector: 'app-operations-calendar',
  templateUrl: './operations-calendar.component.html',
  styleUrls: ['./operations-calendar.component.css']
})

export class OperationsCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin];
  calendarWeekends = true;
  events: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];

  constructor(private operationService: OperationService,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private operationCalendarEventConverter: OperationCalendarEventConverter,
              private logger: ClientsManagerLogger) {
  }

  ngOnInit() {

  }

  eventClick(model) {
    console.log(model);
    const modalRef = this.modalService.open(OperationDetailsComponent);
    modalRef.componentInstance.operation = _.cloneDeep(model);
    modalRef.result.then((result) => {
      this.renderEvents();
    }).catch(error => {
      this.logger.logError(error);
      // TODO redirect to error page
    });
  }

  renderEvents() {
    from(this.operationService.getAllOperations()).subscribe((data: Operation[]) => {
      this.events = this.operationCalendarEventConverter.convertArray(data);
    });
  }

  createEvent(date) {
    console.log(date);
    const modalRef = this.modalService.open(OperationEditComponent);
    modalRef.componentInstance.operation = _.cloneDeep(Operation.getOperationForCreate(date));
    modalRef.result.then((result) => {
      this.activeModal.close(result);
      this.renderEvents();
    }).catch(error => {
      this.activeModal.close(error);
      // TODO redirect to error page
    });
  }
}
