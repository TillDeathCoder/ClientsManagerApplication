"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win = null;
// detect serve mode
var args = process.argv.slice(1);
var serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    if (serve) {
        // get dynamic version from localhost:4200
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL('http://localhost:4200');
    }
    else {
        // load the dist folder from Angular
        win.loadURL(url.format({
            pathname: path.join(__dirname, "/dist/index.html"),
            protocol: "file:",
            slashes: true
        }));
    }
    // The following is optional and will open the DevTools:
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    // initialize the app's main window
    electron_1.app.on("activate", function () {
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
