import { app, BrowserWindow } from 'electron';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let mainWindow: BrowserWindow;

app.whenReady().then(() => {
  const config = {
    webPreferences: {
      nodeIntegration: true, // Load node modules in renderer process
      wbeSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      webviewTag: true,
      spellcheck: false,
      disableHtmlFullscreenWindowResize: true,
    },
  };

  mainWindow = new BrowserWindow(config);
  mainWindow.webContents.openDevTools({ mode: 'undocked' });
  mainWindow.loadURL(process.argv[2]);
});
