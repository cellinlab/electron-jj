import knex, { Knex } from 'knex';
import fs from 'fs';
import path from 'path';

let dbInstance: Knex;
// @ts-ignore
if (!dbInstance) {
  let dbPath = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + '/.local/share');
  dbPath = path.join(dbPath, 'electron-jj/db.db');
  let dbExists = fs.existsSync(dbPath);
  if (!dbExists) {
    const resourecePath = path.join(process.execPath, '../resources/db.db');
    fs.copyFileSync(resourecePath, dbPath);
  }
  dbInstance = knex({
    client: 'better-sqlite3',
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
  });
}

export const db = dbInstance;