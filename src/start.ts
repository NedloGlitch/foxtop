import * as path from 'path';
import { BrowserWindow, ipcMain } from 'electron';


export const createStartWindow = (icon: string): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    icon: icon,
    transparent: true,
    frame: false,
    webPreferences:{
      nodeIntegration:true,
      //preload: path.join(__dirname, "preload.js"),
      contextIsolation:false
    }
  });
  //mainWindow.setIgnoreMouseEvents(true)
  // and load the index.html of the app.
  //console.log(path.join(__dirname, "../windows/start.html"))

  ipcMain.on('set-ignore-mouse-events', (event, ...args) => {
    BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(args[0], ...args)
    console.log("Ignore change, args: " + args[0])
  })

  mainWindow.setAlwaysOnTop(true);
  mainWindow.loadFile(path.join(__dirname, "../windows/start.html"));

  ipcMain.on('closeApp', () => {
      console.log("got event to close app")
    })

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  //mainWindow.webContents.on('did-finish-load', function () {
};