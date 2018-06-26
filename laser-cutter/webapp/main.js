const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

const globalShortcut = require('electron').globalShortcut
let win

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

function createWindow () {
  win = new BrowserWindow({
    width: 1000,
    height: 800
  });

  win.useContentSize = true;
  //win.autoHideMenuBar = true;
  win.setMenu(null);

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })

  // globalShortcut.register('f5', function() {
	// 	win.reload()
	// })
	globalShortcut.register('CommandOrControl+R', function() {
		win.reload()
	})
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})