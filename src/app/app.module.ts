/* Modules */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {FullCalendarModule} from 'ng-fullcalendar';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {NgxElectronModule} from 'ngx-electron';
/* Components */
import {AppComponent} from './app.component';
import {ClientsComponent} from './component/client/clients/clients.component';
import {OperationDetailsComponent} from './component/operation/operation-details/operation-details.component';
import {OperationsCalendarComponent} from './component/operation/operations-calendar/operations-calendar.component';
import {OperationEditComponent} from './component/operation/operation-edit/operation-edit.component';
import {ClientEditComponent} from './component/client/client-edit/client-edit.component';
import {ErrorDetailsComponent} from './component/error/error-details/error-details.component';
import {ClientsNameFilter} from './filter/clients.name.filter';
import {ClientsStatusFilter} from './filter/clients.status.filter';
import {OperationCloseComponent} from './component/operation/operation-close/operation-close.component';
import {StatisticYearComponent} from './component/statistic/statistic-year/statistic-year.component';
import {StatisticMonthComponent} from './component/statistic/statistic-month/statistic-month.component';

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
        ReactiveFormsModule,
        NgxElectronModule
    ],
    providers: [NgbActiveModal],
    bootstrap: [AppComponent],
    entryComponents:
        [OperationDetailsComponent, OperationEditComponent, ClientEditComponent, ErrorDetailsComponent, OperationCloseComponent]
})
export class AppModule {
}
