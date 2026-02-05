import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";

// Plugin to open multiple URLs on dev server start
function openMultipleUrls(urls: string[]) {
  let opened = false;
  return {
    name: "open-multiple-urls",
    configureServer(server: ViteDevServer) {
      server.httpServer?.once("listening", () => {
        if (opened) return;
        opened = true;

        const address = server.httpServer?.address();
        const port = typeof address === "object" ? address?.port : 5173;
        const base = `http://localhost:${port}`;

        urls.forEach((url, index) => {
          setTimeout(() => {
            import("open").then((open) => {
              open.default(`${base}${url}`);
            });
          }, index * 500);
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), openMultipleUrls(["/", "/?view=cams"])],
});
