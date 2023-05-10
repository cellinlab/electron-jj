import { app, BrowserWindow } from 'electron';
import { CustomScheme } from './CustomScheme';

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

  if (process.argv[2]) {
    mainWindow.loadURL(process.argv[2]);
    mainWindow.webContents.openDevTools({ mode: 'undocked' });
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL('app://index.html');
  }
});
