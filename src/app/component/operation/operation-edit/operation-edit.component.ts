import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Operation} from '../../../entity/operation';
import {
    NgbActiveModal,
    NgbDateParserFormatter,
    NgbDatepickerI18n,
    NgbModal,
    NgbTypeahead
} from '@ng-bootstrap/ng-bootstrap';
import {Client} from '../../../entity/client';
import {OperationType} from '../../../entity/operation-type';
import {ClientsManagerDateFormatter} from '../../../utils/formatter/clients-manager-date-formatter';
import {ClientsManagerDatepickerLocaleFormatter} from '../../../utils/formatter/clients-manager-datepicker-locale-formatter';
import {ClientsManagerTimeFormatter} from '../../../utils/formatter/clients-manager-time-formatter';
import {AsyncValidatorFn, FormControl} from '@angular/forms';
import {OperationValidator} from '../../../utils/validator/operation-validator';
import {isNumber} from 'util';
import {merge, Observable, Subject} from 'rxjs';
import {from} from 'rxjs/internal/observable/from';
import {ClientEditComponent} from '../../client/client-edit/client-edit.component';
import {ErrorService} from '../../../service/error.service';
import {CRUDService} from '../../../service/crud.service';
import {environment} from '../../../../environments/environment';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {StringUtils} from '../../../utils/string.utils';
import * as _ from 'lodash';

@Component({
    selector: 'rp-operation-edit',
    templateUrl: './operation-edit.component.html',
    styleUrls: ['./operation-edit.component.css'],
    providers: [
        {provide: NgbDateParserFormatter, useClass: ClientsManagerDateFormatter},
        {provide: NgbDatepickerI18n, useClass: ClientsManagerDatepickerLocaleFormatter}
    ]
})

export class OperationEditComponent implements OnInit {

    @Input() operation: Operation;
    clients: Client[];
    operationTypes: OperationType[];
    operationTypeControl: FormControl;
    clientControl: FormControl;
    timeStartControl: FormControl;
    timeFinishControl: FormControl;
    clientStatus = true;
    timeStatus = true;
    dateTimeStatus = true;
    priceStatus = true;
    priceControl: FormControl;
    statusControl: FormControl;

    OPEN_STATUS = environment.operations.OPEN_STATUS;
    CLOSED_STATUS = environment.operations.CLOSED_STATUS;
    CANCELLED_STATUS = environment.operations.CANCELLED_STATUS;

    @ViewChild('instance') instance: NgbTypeahead;
    focus$ = new Subject<string>();
    click$ = new Subject<string>();

    constructor(public activeModal: NgbActiveModal,
                private modalService: NgbModal,
                private dateFormatter: NgbDateParserFormatter,
                private timeFormatter: ClientsManagerTimeFormatter,
                private operationValidator: OperationValidator,
                private errorService: ErrorService,
                private crudService: CRUDService) {
    }

    ngOnInit() {
        from(this.crudService.getAll(OperationType)).subscribe(types => {
            this.operationTypes = types;
        }, error => {
            this.errorService.showError(environment.messages.errors.GET_ALL__OPERATION_TYPES_COMPONENT, error);
        });

        from(this.crudService.getAll(Client)).subscribe(clients => {
            this.clients = _.filter(clients, client => client.status === environment.clients.ACTIVE_STATUS);
        }, error => {
            this.errorService.showError(environment.messages.errors.GET_ALL_CLIENTS_COMPONENT, error);
        });

        this.operationTypeControl = new FormControl(this.operation.operationType, [(control: FormControl) => {
            this.operation.operationType = control.value;
            return null;
        }]);

        this.clientControl = new FormControl(this.operation.client, [(control: FormControl) => {
            const client = control.value;

            if (client && client.firstName) {
                this.operation.client = control.value;
                this.clientStatus = true;
                return null;
            }

            this.clientStatus = false;
            return {
                noClient: true
            };
        }]);

        this.timeStartControl = new FormControl(this.timeFormatter.formatTime(this.operation.startTime), [(control: FormControl) => {
                const startValue = control.value;
                if (!startValue) {
                    this.timeStatus = true;
                    return null;
                }
                this.operation.startTime = this.timeFormatter.formatString(startValue);

                if (this.operationValidator.validateStartAndFinishTimeValue(this.operation)) {
                    this.timeStatus = true;
                    return null;
                }

                this.timeStatus = false;
                return {
                    invalidRange: true
                };
            }],
            [this.dateTimeValidation()]);

        this.timeFinishControl = new FormControl(this.timeFormatter.formatTime(this.operation.finishTime), [(control: FormControl) => {
                const finishValue = control.value;
                if (!finishValue) {
                    this.timeStatus = true;
                    return null;
                }
                this.operation.finishTime = this.timeFormatter.formatString(finishValue);
                if (this.operationValidator.validateStartAndFinishTimeValue(this.operation)) {
                    this.timeStatus = true;
                    return null;
                }

                this.timeStatus = false;
                return {
                    invalidRange: true
                };
            }],
            [this.dateTimeValidation()]);

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

        this.statusControl = new FormControl(this.operation.status, [(control: FormControl) => {
            this.operation.status = control.value;
            return null;
        }], [this.dateTimeValidation()]);
    }

    dateTimeValidation(): AsyncValidatorFn {
        return (formControl: FormControl): Observable<any> => {
            return from(this.operationValidator.validateDateTimeRange(this.operation).then(result => {
                this.dateTimeStatus = result === null;
            }).catch(error => {
                this.errorService.showError(environment.messages.errors.DATE_TIME_RANGE_VALIDATION, error);
            }));
        };
    }

    async save() {
        let result;
        if (this.operation.id) {
            result = await this.crudService.update(Operation, this.operation);
        } else {
            result = await this.crudService.create(Operation, this.operation);
        }
        this.activeModal.close(result);
    }

    async setDate(date) {
        this.operation.date = this.dateFormatter.format(date);
        const result = await this.operationValidator.validateDateTimeRange(this.operation);
        this.dateTimeStatus = result === null;
    }

    addClient() {
        const modalRef = this.modalService.open(ClientEditComponent, {backdrop: 'static', keyboard: false});
        modalRef.componentInstance.client = Client.getClientForCreate();
        modalRef.result.then((result) => {
            if (result && result.isNew) {
                this.clients.push(result.client);
                this.clientControl.setValue(result.client);
            }
        }).catch(error => {
            this.errorService.showError(environment.messages.errors.CREATE_CLIENT_COMPONENT, error);
        });
    }

    compare(first: any, second: any): boolean {
        if (!first || !second) {
            return false;
        }
        return first.id === second.id;
    }

    formatter(result: any) {
        const firstName = result.firstName ? result.firstName : '';
        const lastName = result.lastName ? result.lastName : '';

        if (lastName) {
            return `${firstName} ${lastName}`;
        }

        return firstName;
    }

    search = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(term => term === ''
                ? this.clients
                : this.clients.filter(client => {
                    return StringUtils.isStringContains(client.firstName, term)
                        || StringUtils.isStringContains(client.lastName, term);
                }).slice(0, 10))
        );
    }
}
