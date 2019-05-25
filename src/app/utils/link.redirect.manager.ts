import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Injectable({
    providedIn: 'root'
})
export class LinkRedirectManager {

    constructor(private electronService: ElectronService) {

    }

    openLink(link) {
        this.electronService.shell.openExternal(link);
    }

}
