import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class ClientsManagerLogger {
  constructor(private logger: NGXLogger) {
  }

  logRequest(method: string, urlPart: string, options: any, body: any) {
    this.logger.debug('Method: ' + method);
    this.logger.debug('URL API: ' + urlPart);
    this.logger.debug('Headers: ');
    this.logger.debug(options);
    if (body) {
      this.logger.debug('Body: ');
      this.logger.debug(body);
    }
  }

  logResponse(response: any) {
    this.logger.debug('Response: ');
    this.logger.debug(response);
  }

  logError(error: any) {
    // todo add api call to write error in log file;
    this.logger.error(error);
  }
}
