import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {NGXLogger} from 'ngx-logger';
import {ElectronService} from 'ngx-electron';

@Injectable({
    providedIn: 'root'
})
export class Logger {

    private logger;

    constructor(private ngxLogger: NGXLogger,
                private electronService: ElectronService) {
        if (environment.production && this.electronService.isElectronApp) {
            this.logger = this.electronService.remote.require('electron-log');
        } else {
            this.logger = this.ngxLogger;
        }
    }

    debug(message: any, ...additional: any[]) {
        if (additional) {
            this.logger.debug(message, additional);
        } else {
            this.logger.debug(message);
        }
    }

    error(message: any, ...additional: any[]) {
        if (additional) {
            this.logger.error(message, additional);
        } else {
            this.logger.error(message);
        }
    }


}
