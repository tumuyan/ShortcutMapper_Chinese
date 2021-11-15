const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron')
const activeWindow = require('active-win');
const path = require('path')

let mainWindow
let activeWin


function createWindow() {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: true,

        }
    })

    mainWindow.loadFile('index.html')

    globalShortcut.register('Meta+Esc', () => {
        console.log('Read Active-win: ')

        activeWin = activeWindow()
        //  console.log(activeWin);
        activeWin.then(function (info) {
            console.log(info.owner);
            mainWindow.webContents.send('update-app', info.owner.name);
            mainWindow.show();
            mainWindow.maximize();
        })

        mainWindow.on('closed', function () {
            mainWindow = null
        })
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

ipcMain.on('minimize', (event) => {
    mainWindow.minimize();
})

ipcMain.on('reload', (event) => {
    mainWindow.loadFile('index.html')
})