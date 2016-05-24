'use strict';

// var app = require('app');
// var BrowserWindow = require('browser-window');
// var globalShortcut = require('global-shortcut');
// var configuration = require('./configuration');
// var ipc = require('ipc');

const electron = require('electron');
// Module to control application life.
const app = electron.app
// Module hox permite to knox if we are in dev environnement

// Module to copy paste and so on
const {Menu, MenuItem} = electron;

const menu = new Menu();
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
var electronScreen
const globalShortcut = electron.globalShortcut;
var ipcMain = electron.ipcMain;
// var ipc = require('ipc');

var mainWindow = null;
var settingsWindow = null;
var isFullmode = false;



function createWindow () {
  electronScreen = require('electron').screen;
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 350, height: 500, titleBarStyle : "hidden-inset", backgroundColor:"#151515", resizable : false, fullscreenable : false})

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
  });

  // Create the Application's main menu
  var template = [{
      label: "Application",
      submenu: [
          { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
          { type: "separator" },
          { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
      ]}, {
      label: "Edit",
      submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('fullScreenMode', function(){
  if(mainWindow.isFullScreen()) mainWindow.setFullScreen(false);
  else mainWindow.setFullScreen(true);
});

ipcMain.on('openApp', function () {
  mainWindow.setResizable(true);
  mainWindow.setFullScreenable(true);

  var display = electronScreen.getPrimaryDisplay();

  var width = 1000;
  var x = Math.round((display.workArea.width - width)/2);
  var height = 600;
  var y = Math.round((display.workArea.height - height)/2);
  mainWindow.setBounds({ x: x, y: y, width: width, height: height }, true);
});


