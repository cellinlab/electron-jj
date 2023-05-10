import { protocol } from 'electron';

import fs from 'fs';
import path from 'path';

const schemeConfig = {
  standard: true,
  supportFetchAPI: true,
  bypassCSP: true,
  corsEnabled: true,
  streame: true,
};

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: schemeConfig,
  },
]);

export class CustomScheme {
  private static getMimeType(ext: string) {
    let mimeType = '';
    switch (ext) {
      case '.js':
        mimeType = 'text/javascript';
        break;
      case '.css':
        mimeType = 'text/css';
        break;
      case '.html':
        mimeType = 'text/html';
        break;
      case '.svg':
        mimeType = 'image/svg+xml';
        break;
      case '.json':
        mimeType = 'application/json';
        break;
      default:
        mimeType = 'text/plain';
        break;
    }
    return mimeType;
  }

  static registerScheme() {
    protocol.registerStreamProtocol('app', (request, callback) => {
      let pathName = new URL(request.url).pathname;
      let ext = path.extname(pathName).toLowerCase();
      if (ext === '') {
        pathName = 'index.html';
        ext = '.html';
      }
      const targetFile = path.join(__dirname, pathName);
      callback({
        statusCode: 200,
        headers: {
          'Content-Type': this.getMimeType(ext),
        },
        data: fs.createReadStream(targetFile),
      });
    });
  }
}