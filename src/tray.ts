import { app, screen } from 'electron'
import { createStartWindow } from './start'
import * as path from 'path';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function makeTray() { 
    const trayMenuTemplate = [
        {
            label: "Foxtop",
            enabled: false
        },
        {
            label: "Call another mascot!",
            click: function (): void {
                const { width, height } = screen.getPrimaryDisplay().workAreaSize
                createStartWindow(path.join(__dirname, "../foxtop.ico"), width, height)
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
                app.quit();
            }
        }
    ]
    return trayMenuTemplate;
}