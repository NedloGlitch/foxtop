import { app, dialog } from 'electron'
import { winList } from './main'
import { createStartWindow } from './start'


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function makeTray(icon: string) {
    const trayMenuTemplate = [
        {
            icon: icon,
            label: "Foxtop",
            click: function (): void {
                app.focus()
            }
        },
        {
            label: "Call another mascot!",
            click: async function () {
                const file = await dialog.showOpenDialog(winList[0], {
                    properties: ['openDirectory']
                });
                if (file.filePaths.length == 1) {
                    createStartWindow(winList, file.filePaths[0])
                }
                console.log(file.filePaths[0])
            }
        },
        {
            label: "Settings",
            click: function (): void {
                console.log("Clicked on settings")
            }
        },
        {
            label: "Exit",
            click: function (): void {
                console.log("Exit")
                //tray = undefined
                app.quit();
            }
        }
    ]
    return trayMenuTemplate;
}