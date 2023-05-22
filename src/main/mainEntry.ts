import { app, BrowserWindow } from 'electron';
import { CustomScheme } from './CustomScheme';
import { CommonWindowEvent } from './CommonWindowEvent';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let mainWindow: BrowserWindow;

app.on("browser-window-created", (e, win) => {
  CommonWindowEvent.regWinEvent(win);
});

app.whenReady().then(() => {
  const config = {
    frame: false,
    // show: false,
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
    mainWindow.webContents.openDevTools({ mode: 'bottom' });
  } else {
    CustomScheme.registerScheme();
    mainWindow.loadURL('app://index.html');
  }
  CommonWindowEvent.listen();
});
