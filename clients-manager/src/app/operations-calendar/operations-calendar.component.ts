import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {OperationDetailsComponent} from '../operation-details/operation-details.component';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OperationCalendarEventConverter} from '../utils/operation-calendar-event-converter';
import {OperationService} from '../service/operation.service';
import {Operation} from '../entity/operation';
import * as _ from 'lodash';
import * as moment from 'moment';
import {OperationEditComponent} from '../operation-edit/operation-edit.component';
import {isMoment} from 'moment';
import {Options} from 'fullcalendar';
import {from} from 'rxjs';
import {NGXLogger} from 'ngx-logger';

const DATE_FORMAT = 'YYYY-MM-DD';

@Component({
  selector: 'rp-operations-calendar',
  templateUrl: './operations-calendar.component.html',
  styleUrls: ['./operations-calendar.component.css']
})

export class OperationsCalendarComponent implements OnInit {
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  calendarOptions: Options;
  events: any;

  constructor(private operationService: OperationService,
              private modalService: NgbModal,
              public activeModal: NgbActiveModal,
              private operationCalendarEventConverter: OperationCalendarEventConverter,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    from(this.operationService.getAllOperations()).subscribe((data: Operation[]) => {
        this.logger.log(data);
        this.calendarOptions = {
          header: {
            left: 'createEventButton today prev,next',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          themeSystem: 'jquery-ui',
          themeButtonIcons: true,
          monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
          monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
          dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          allDayText: 'Время',
          buttonText: {
            today: 'Сегодня',
            month: 'Месяц',
            week: 'Неделя',
            day: 'День'
          },
          locale: 'ru',
          editable: true,
          eventLimit: false,
          events: this.operationCalendarEventConverter.convertArray(data),
          customButtons: {
            createEventButton: {
              text: 'Добавить запись',
              click(element: JQuery): void {
              }
            }
          },
          timeFormat: 'HH:mm'
        };
      },
      error => {
        this.logger.error(error);
        // TODO redirect to error page
      });
  }

  eventClick(model) {
    const modalRef = this.modalService.open(OperationDetailsComponent);
    modalRef.componentInstance.operation = _.cloneDeep(model);
    modalRef.result.then((result) => {
      this.renderEvents();
    }).catch(error => {
      this.logger.error(error);
      // TODO redirect to error page
    });
  }

  renderEvents() {
    from(this.operationService.getAllOperations()).subscribe((data: Operation[]) => {
      this.events = this.operationCalendarEventConverter.convertArray(data);
    });
  }

  createEvent(event) {
    if (isMoment(event) || (event.detail && event.detail.buttonType === 'createEventButton')) {
      let formattedDate = moment(new Date()).format(DATE_FORMAT);
      if (isMoment(event)) {
         formattedDate = moment(event).format(DATE_FORMAT);
      }
      const modalRef = this.modalService.open(OperationEditComponent);
      modalRef.componentInstance.operation = _.cloneDeep(Operation.getOperationForCreate(formattedDate));
      modalRef.result.then((result) => {
        this.activeModal.close(result);
        this.renderEvents();
      }).catch(error => {
        this.activeModal.close(error);
        // TODO redirect to error page
      });
    }
  }
}
