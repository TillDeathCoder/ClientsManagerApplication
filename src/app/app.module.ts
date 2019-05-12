/* Modules */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {FullCalendarModule} from 'ng-fullcalendar';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
/* Components */
import {AppComponent} from './app.component';
import {ClientsComponent} from './component/clients/clients.component';
import {OperationDetailsComponent} from './component/operation-details/operation-details.component';
import {OperationsCalendarComponent} from './component/operations-calendar/operations-calendar.component';
import {OperationEditComponent} from './component/operation-edit/operation-edit.component';
import {ClientEditComponent} from './component/client-edit/client-edit.component';
import {ErrorDetailsComponent} from './component/error-details/error-details.component';
import {ClientsNameFilter} from './filter/clients.name.filter';
import {ClientsStatusFilter} from './filter/clients.status.filter';
import {OperationCloseComponent} from './component/operation-close/operation-close.component';
import { StatisticYearComponent } from './component/statistic-year/statistic-year.component';
import { StatisticMonthComponent } from './component/statistic-month/statistic-month.component';

@NgModule({
    declarations: [
        AppComponent,
        ClientsComponent,
        OperationDetailsComponent,
        OperationsCalendarComponent,
        OperationEditComponent,
        ClientEditComponent,
        ErrorDetailsComponent,
        ClientsNameFilter,
        ClientsStatusFilter,
        OperationCloseComponent,
        StatisticYearComponent,
        StatisticMonthComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FullCalendarModule,
        LoggerModule.forRoot({
            serverLoggingUrl: '/api/logs',
            level: NgxLoggerLevel.DEBUG,
            serverLogLevel: NgxLoggerLevel.ERROR
        }),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [NgbActiveModal],
    bootstrap: [AppComponent],
    entryComponents:
        [OperationDetailsComponent, OperationEditComponent, ClientEditComponent, ErrorDetailsComponent, OperationCloseComponent]
})
export class AppModule {
}
