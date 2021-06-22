import { app } from 'electron'
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
            click: function (): void {
                createStartWindow()
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