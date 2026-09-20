import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const astro = resolve(root, "node_modules", ".bin", "astro");

execFileSync(astro, ["build"], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
});

mkdirSync(resolve(root, "dist", "server"), { recursive: true });
mkdirSync(resolve(root, "dist", ".openai"), { recursive: true });

writeFileSync(
  resolve(root, "dist", "server", "index.js"),
  `export default {
  async fetch(request, env) {
    if (env?.ASSETS?.fetch) return env.ASSETS.fetch(request);
    return new Response("Static site assets are unavailable.", { status: 503 });
  }
};
`,
);

cpSync(
  resolve(root, ".openai", "hosting.json"),
  resolve(root, "dist", ".openai", "hosting.json"),
);

execFileSync(resolve(root, "scripts", "validate-artifact.sh"), [], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});
