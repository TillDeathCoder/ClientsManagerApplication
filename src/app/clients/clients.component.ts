import { Component, OnInit } from '@angular/core';
import {CRUDService} from '../service/crud.service';
import {Client} from '../entity/client';
import {from} from 'rxjs';
import {ErrorService} from '../service/error.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'rp-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  page = 1;
  pageSize = 6;
  searchName: string;

  constructor(private crudService: CRUDService,
              private errorService: ErrorService) { }

  ngOnInit() {
    from(this.crudService.getAll(Client)).subscribe(result => {
      this.clients = result;
    }, error => {
      this.errorService.showError(environment.messages.errors.GET_ALL_CLIENTS_COMPONENT, error);
    });
  }

}
