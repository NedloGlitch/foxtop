import { app, BrowserWindow, Tray, Menu } from 'electron';
import { createStartWindow } from './start'
import { makeTray } from './tray'
import * as path from 'path';


app.commandLine.appendSwitch('disable-gpu-compositing')
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let tray: any = null
const iconpath = path.join(__dirname, "../foxtop.ico");

function initialize(): void {

  createStartWindow(iconpath)

  tray = new Tray(iconpath)
  tray.setToolTip('Foxtop')
  const trayMenu = Menu.buildFromTemplate(makeTray())
  tray.setContextMenu(trayMenu)
}


app.on('ready', initialize);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createStartWindow(iconpath);
  }
});

