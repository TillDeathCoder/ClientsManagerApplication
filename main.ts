import {app, BrowserWindow, Menu, Tray} from 'electron';
import * as path from 'path';
import * as url from 'url';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
let win: BrowserWindow = null;

// detect serve mode
const args = process.argv.slice(1);
const serve: boolean = args.some(val => val === '--serve');

function createWindow() {

    win = new BrowserWindow({minWidth: 1100, icon: path.join(__dirname, '/src/assets/icons/favicon.ico')});

    if (serve) {
        // get dynamic version from localhost:4200
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`)
        });
        win.loadURL('http://localhost:4200');
    } else {
        // load the dist folder from Angular
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, `/dist/index.html`),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    win.maximize();
    win.setMenuBarVisibility(false);

    win.on('closed', () => {
        win = null;
    });
}

try {

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    // initialize the app's main window
    app.on('activate', () => {
        if (win === null) {
            createWindow();
        }
    });

} catch (e) {
    // Catch Error
    // throw e;
}
