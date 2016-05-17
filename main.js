'use strict';

// var app = require('app');
// var BrowserWindow = require('browser-window');
// var globalShortcut = require('global-shortcut');
// var configuration = require('./configuration');
// var ipc = require('ipc');

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
var ipcMain = electron.ipcMain;
// var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;
var isFullmode = false;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1000, height: 800, titleBarStyle:'hidden', transparent:true})

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

app.on('ready', createWindow);

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

ipcMain.on('close-main-window', function () {
    app.quit();
});
ipcMain.on('fullscreen-main-window', function () {
  if(isFullmode){
    mainWindow.maximize();
    isFullmode = false;
  }
  else {
    mainWindow.unmaximize();
    isFullmode = true;
  }
});
ipcMain.on('minimize-main-window', function () {
    mainWindow.minimize();
});


