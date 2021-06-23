import { join } from 'path';
import { app, BrowserWindow, screen } from 'electron';


export const createStartWindow = (winList: BrowserWindow[], imgPath: string): void => {
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
    
    webPreferences:{
      nodeIntegration:true,
      
      contextIsolation:false
    }
  });

  mainWindow.loadFile(join(app.getAppPath(), "/windows/start.html"));
  //const contextMenu = Menu.buildFromTemplate(makeTray())
  //mainWindow.webContents.on('context-menu', function(){
    //contextMenu.popup()
    //console.log("right click handler")
  //})
  //mainWindow.webContents.openDevTools()
  winList.push(mainWindow)

  mainWindow.webContents.on("did-finish-load", ()=>{
    mainWindow.webContents.send('get-image', imgPath)
  })
};