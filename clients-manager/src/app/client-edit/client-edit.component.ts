import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, Validators} from '@angular/forms';
import {Client} from '../entity/client';
import {ClientService} from '../service/client.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'rp-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  @Input() client: Client;
  firstNameControl: FormControl;
  isNameValid = true;
  phoneNumberControl: FormControl;
  isPhoneValid = true;

  constructor(public activeModal: NgbActiveModal,
              private clientService: ClientService) {
  }

  ngOnInit() {
    this.firstNameControl = new FormControl(this.client.firstName, ((control: FormControl) => {
      const value = control.value;
      if (value) {
        this.client.firstName = value;
        this.isNameValid = true;
        return null;
      }

      this.isNameValid = false;
      return {
        missedValue: true
      };
    }));

    this.phoneNumberControl = new FormControl(this.client.phoneNumber, ((control: FormControl) => {
      let value = control.value;
      value = value.toString().split('-').join('');
      if (!value) {
        this.isPhoneValid = true;
        return null;
      }

      if (value.match(environment.formats.PHONE_NUMBER_FORMAT)) {
        this.client.phoneNumber = value;
        this.isPhoneValid = true;
        return null;
      }

      this.isPhoneValid = false;
      return {
        invalidPhone: true
      };
    }));
  }

  async save() {
    let result = {
      isNew: false,
      client: null
    };
    if (this.client.id) {
      result = {
        isNew: false,
        client: await this.clientService.updateClient(this.client)
      };
    } else {
      this.client.status = environment.clients.ACTIVE_STATUS;
      result = {
        isNew: true,
        client: await this.clientService.createClient(this.client)
      };
    }
    if (result.client === {}) {
      // TODO add redirect to error page
    }
    this.activeModal.close(result);
  }
}
