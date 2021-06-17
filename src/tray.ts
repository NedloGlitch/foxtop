import { app } from 'electron'

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
                console.log("Clicked on mascot")
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