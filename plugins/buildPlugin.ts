import path from 'path';
import fs from 'fs-extra';

class BuildObj {
  buildMain() {
    require('esbuild').buildSync({
      entryPoints: ['./src/main/mainEntry.ts'],
      bundle: true,
      platform: 'node',
      minify: true,
      outfile: './dist/mainEntry.js',
      external: ['electron'],
    });
  }

  preparePackageJson() {
    const pkgJsonPath = path.join(process.cwd(), 'package.json');
    const localPkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    const electronConfig = localPkgJson.devDependencies.electron.replace('^', '');
    localPkgJson.main = 'mainEntry.js';
    delete localPkgJson.scripts;
    delete localPkgJson.devDependencies;
    localPkgJson.devDependencies = {
      electron: electronConfig,
    };
    localPkgJson.dependencies["better-sqlite3"] = "*";
    localPkgJson.dependencies["bindings"] = "*";
    const tarJsonPath = path.join(process.cwd(), 'dist', 'package.json');
    fs.writeFileSync(tarJsonPath, JSON.stringify(localPkgJson));
    fs.mkdirSync(path.join(process.cwd(), 'dist', 'node_modules'));
  }

  async prepareSqlite() {
    const srcDir = path.join(process.cwd(), 'node_modules', 'better-sqlite3');
    const destDir = path.join(process.cwd(), 'dist', 'node_modules', 'better-sqlite3');
    fs.ensureDirSync(destDir);
    fs.copySync(srcDir, destDir, {
      filter: (src, dest) => {
        if (src.endsWith("better-sqlite3") || src.endsWidth("build") || src.endsWidth("Release") || src.endsWith("better_sqlite3.node")) {
          return true;
        }
        if (src.includes("node_modules\\better-sqlite3\\lib")) return true;
        return false;
      }
    });

    let pkgJson = `{"name": "better-sqlite3","main": "lib/index.js"}`;
    let pkgJsonPath = path.join(process.cwd(), `dist/node_modules/better-sqlite3/package.json`);
    fs.writeFileSync(pkgJsonPath, pkgJson);

    let bindingPath = path.join(process.cwd(), `dist/node_modules/bindings/index.js`);
    fs.ensureFileSync(bindingPath);
    let bindingsContent = `module.exports = () => {
    let addonPath = require("path").join(__dirname, '../better-sqlite3/build/Release/better_sqlite3.node');
    return require(addonPath);
    };`;
    fs.writeFileSync(bindingPath, bindingsContent);

    pkgJson = `{"name": "bindings","main": "index.js"}`;
    pkgJsonPath = path.join(process.cwd(), `dist/node_modules/bindings/package.json`);
    fs.writeFileSync(pkgJsonPath, pkgJson);
  }

  prepareKnexjs() {
    let pkgJsonPath = path.join(process.cwd(), `dist/node_modules/knex`);
    fs.ensureDirSync(pkgJsonPath);
    require("esbuild").buildSync({
      entryPoints: ["./node_modules/knex/knex.js"],
      bundle: true,
      platform: "node",
      format: "cjs",
      minify: true,
      outfile: "./dist/node_modules/knex/index.js",
      external: ["oracledb", "pg-query-stream", "pg", "sqlite3", "tedious", "mysql", "mysql2", "better-sqlite3"],
    });
    let pkgJson = `{"name": "bindings","main": "index.js"}`;
    pkgJsonPath = path.join(process.cwd(), `dist/node_modules/knex/package.json`);
    fs.writeFileSync(pkgJsonPath, pkgJson);
  }

  buildInstaller() {
    const options = {
      config: {
        directories: {
          output: path.join(process.cwd(), 'release'),
          app: path.join(process.cwd(), 'dist'),
        },
        files: ['**'],
        extends: null,
        productName: 'electron-vite-template',
        appId: 'com.electron-vite-template',
        asar: true,
        nsis: {
          oneClick: true,
          perMachine: true,
          allowToChangeInstallationDirectory: false,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: 'electron-vite-template',
        },
        publish: [
          {
            provider: 'generic',
            url: 'http://localhost:5000/',
          },
        ],
        extraResources: [{ from: `./src/common/db.db`, to: `./` }],
      },
      project: process.cwd(),
    };
    return require('electron-builder').build(options);
  }
}

export const buildPlugin = () => {
  return {
    name: 'build-plugin',
    closeBundle: () => {
      const buildObj = new BuildObj();
      buildObj.buildMain();
      buildObj.preparePackageJson();
      buildObj.prepareSqlite();
      buildObj.prepareKnexjs();
      buildObj.buildInstaller();
    },
  };
};