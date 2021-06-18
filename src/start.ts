import * as path from 'path';
import { BrowserWindow, Menu} from 'electron';
import { makeTray } from './tray';


export const createStartWindow = (icon: string, width: number, height: number): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    //enableLargerThanScreen:true,
    skipTaskbar:true,
    height: height+30, 
    width: width-1,
    icon: icon,
    transparent: true,
    frame: false,
    alwaysOnTop:true,
    //webPreferences:{
    //  nodeIntegration:true,
    //  contextIsolation:false
    //}
  });

  
  mainWindow.loadFile(path.join(__dirname, "../windows/start.html"));
  const contextMenu = Menu.buildFromTemplate(makeTray())
  mainWindow.webContents.on('context-menu', function(){
    contextMenu.popup()
    //console.log("right click handler")
  })
};