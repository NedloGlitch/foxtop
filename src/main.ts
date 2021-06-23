import { app, BrowserWindow, Tray, Menu, ipcMain, dialog } from 'electron';
import { createStartWindow } from './start'
import { makeTray } from './tray'
import { join } from 'path';


app.commandLine.appendSwitch('disable-gpu-compositing')
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let tray: Tray;
const iconpath = join(app.getAppPath(), "/foxtop.ico");

function initialize(): void {
  
  //console.log(width, height)
  createStartWindow(winList, "../mascots/eevee/")

  tray = new Tray(iconpath)
  tray.setToolTip('Foxtop')
  const trayMenu = Menu.buildFromTemplate(makeTray(join(app.getAppPath(), "/mascots/20x20.png")))
  tray.setContextMenu(trayMenu)

}

export const winList: BrowserWindow[] = [] 

function deleteWindow(id: number) {
  for (let i = 0; i < winList.length; i++) {
    const element = winList[i];
    if(element.webContents.id === id){
      element.close()
      winList.splice(i, 1)
    }
  }
}


ipcMain.on('create-request', function (event, arg) {
  createStartWindow(winList, arg)
});
ipcMain.on('destroy', function (event, arg) {
  deleteWindow(event.sender.id)
});


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
    createStartWindow(winList, "../mascots/eevee/");
  }
});

app.on('before-quit', function () {
  tray.destroy();
});

/*ipcMain.on('open-file', async (event) => {
  const window = getWindow(event.sender.id) as BrowserWindow
    const file = await openFolder(window); 
    if (file.filePaths.length == 1) {
      createStartWindow(winList, file.filePaths[0])
    }
});

function getWindow(id: number) {
  return winList.find((value)=>value.webContents.id===id)
}

function openFolder(window: BrowserWindow, ): Promise<Electron.OpenDialogReturnValue> {
  return dialog.showOpenDialog(window, {
    properties: ['openDirectory']
  });
}
*/
