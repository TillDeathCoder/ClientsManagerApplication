/* Modules */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import {OperationsCalendarComponent} from './operations-calendar/operations-calendar.component';
import {OperationEditComponent} from './operation-edit/operation-edit.component';
import {OperationsListComponent} from './operations-list/operations-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/calendar', pathMatch: 'full'},
  {path: 'calendar', component: OperationsCalendarComponent},
  {path: 'history', component: OperationsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
