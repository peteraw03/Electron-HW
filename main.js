//imports two electron modules
const { app, BrowserWindow, ipcMain } = require('electron/main')
//app controls an application's event lifecycle and 
//BrowserWindow, creates and manages app windows

const path = require('node:path')

//function loads web page into a new BrowserWindow instance
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height:600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

//calls function when the app is ready

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
})
//In Electron, BrowserWindows can only be created after the app module's ready event is fired. 
//You can wait for this event by using the app.whenReady() API 
//and calling createWindow() once its promise is fulfilled.


//closes app entirely when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

//opens window if none open and events active
/*
app.whenReady().then(() => {
    createWindow()

    app.on('actvate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
*/