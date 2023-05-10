import { ViteDevServer } from 'vite';

export const devPlugin = () => {
  return {
    name: 'dev-plugin',
    configureServer(server: ViteDevServer) {
      require("esbuild").buildSync({
        entryPoints: ["./src/main/mainEntry.ts"],
        bundle: true,
        platform: "node",
        outfile: "./dist/mainEntry.js",
        external: ["electron"],
      });
      server.httpServer?.once("listening", () => {
        const { spawn } = require("child_process");
        const addressInfo: any = server.httpServer?.address();
        const httpAddress = `http://localhost:${addressInfo.port}`;

        const electronProcess = spawn(
          require("electron").toString(),
          ["./dist/mainEntry.js", httpAddress],
          {
            cwd: process.cwd(),
            stdio: "inherit",
          }
        );

        electronProcess.on("close", () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};

export const getReplacer = () => {
  const externalModules = ["os", "fs", "path", "events", "child_process", "crypto", "http", "buffer", "url", "electron", "better-sqlite3", "knex"];

  const result = {};
  for (const module of externalModules) {
    result[module] = () => {
      return {
        find: new RegExp(`^${module}$`),
        code: `const ${module} = require("${module}");export {${module} as default}`,
      };
    };
  }

  result["electron"] = () => {
    const electronModules = ["clipboard", "ipcRenderer", "nativeImage", "shell", "webFrame"];
    const electronResult = {
      find: new RegExp(`^electron$`),
      code: `const {${electronModules.join(',')}} = require("electron");export {${electronModules.join(',')}}`,
    };
    return electronResult;
  };

  return result;
};