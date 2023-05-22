import { BrowserWindow, ipcMain, app } from 'electron';

export class CommonWindowEvent {
  private static getWin(event: any) {
    return BrowserWindow.fromWebContents(event.sender);
  }

  public static listen() {
    ipcMain.handle("minimizeWindow", e => {
      this.getWin(e)?.minimize();
    });

    ipcMain.handle("maximizeWindow", e => {
      this.getWin(e)?.maximize();
    });

    ipcMain.handle("unmaximizeWindow", e => {
      this.getWin(e)?.unmaximize();
    });

    ipcMain.handle("hideWindow", e => {
      this.getWin(e)?.hide();
    });

    ipcMain.handle("showWindow", e => {
      this.getWin(e)?.show();
    });

    ipcMain.handle("closeWindow", e => {
      this.getWin(e)?.close();
    });

    ipcMain.handle("resizable", e => {
      return this.getWin(e)?.isResizable();
    });

    ipcMain.handle("getPath", (e, name: any) => {
      return app.getPath(name);
    });
  }

  public static regWinEvent(win: BrowserWindow) {
    win.on("maximize", () => {
      win.webContents.send("windowMaximized");
    });

    win.on("unmaximize", () => {
      win.webContents.send("windowUnmaximized");
    });

    // @ts-ignore
    win.webContents.setWindowOpenHandler((param) => {
      const config = {
        frame: false,
        show: true,
        parent: null,
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false,
          allowRunningInsecureContent: true,
          contextIsolation: false,
          webviewTag: true,
          spellcheck: false,
          disableHtmlFullscreenWindowResize: true,
          nativeWindowOpen: true,
        },
      };
      const features = JSON.parse(param.features);
      for (const feature in features) {
        if (feature === "webPreferences") {
          for (const preference in features[feature]) {
            // @ts-ignore
            config.webPreferences[preference] = features[feature][preference];
          }
        } else {
          // @ts-ignore
          config[feature] = features[feature];
        }
      }
      // @ts-ignore
      if (config["modal"] === true) {
        // @ts-ignore
        config["parent"] = win;
      }
      return {
        action: "allow",
        overrideBrowserWindowOptions: config,
      };
    });
  }
}