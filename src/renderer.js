const { ipcRenderer } = require('electron')


const el = document.getElementById('testBtn')
el.addEventListener("click", ()=> {
    ipcRenderer.send('closeApp')
})

const el2 = document.getElementById('mascot')

el2.addEventListener('mouseleave', () => {
  ipcRenderer.send('set-ignore-mouse-events', true, { forward: true })
})
el2.addEventListener('mouseenter', () => {
  ipcRenderer.send('set-ignore-mouse-events', false )
})
