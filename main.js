'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');
var configuration = require('./configuration');
var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;

app.on('ready', function() {

    mainWindow = new BrowserWindow({width: 800, height: 600, frame:false});

    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools()
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})

ipc.on('close-main-window', function () {
    app.quit();
});
