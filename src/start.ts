import { join } from 'path';
import { BrowserWindow, screen } from 'electron';


export const createStartWindow = (): void => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    
    //enableLargerThanScreen:true,
    skipTaskbar:true,
    height: height+30, 
    width: width-1,
    //icon: icon,
    transparent: true,
    frame: false,
    alwaysOnTop:true,
    resizable:false,
    
    //webPreferences:{
    //  nodeIntegration:true,
    //  contextIsolation:false
    //}
  });


  mainWindow.loadFile(join(__dirname, "../windows/start.html"));
  //const contextMenu = Menu.buildFromTemplate(makeTray())
  //mainWindow.webContents.on('context-menu', function(){
    //contextMenu.popup()
    //console.log("right click handler")
  //})
};