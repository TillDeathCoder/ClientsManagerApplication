/* Modules */
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {FullCalendarModule} from '@fullcalendar/angular';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
/* Components */
import {AppComponent} from './app.component';
import {ClientsComponent} from './clients/clients.component';
import {ClientDetailsComponent} from './client-details/client-details.component';
import {OperationDetailsComponent} from './operation-details/operation-details.component';
import {OperationsCalendarComponent} from './operations-calendar/operations-calendar.component';
import {OperationEditComponent} from './operation-edit/operation-edit.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailsComponent,
    OperationDetailsComponent,
    OperationsCalendarComponent,
    OperationEditComponent,
    ClientEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FullCalendarModule,
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [OperationDetailsComponent, OperationEditComponent, ClientEditComponent]
})
export class AppModule {
}

