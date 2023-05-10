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