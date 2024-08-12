// @ts-check
import * as esbuild from "esbuild";
import { execFileSync } from "node:child_process";
import { copyFileSync } from "node:fs";
import { platform } from "node:os";
import { execPath } from "node:process";

await esbuild.build({
  entryPoints: ["index.ts"],
  outfile: "build/index.js",
  bundle: true,
  platform: "node",
  allowOverwrite: true,
});

const outputPath =
  platform() === "win32"
    ? "build/playwright-demo.exe"
    : "build/playwright-demo";

execFileSync(execPath, ["--experimental-sea-config", "sea-config.json"]);
copyFileSync(execPath, outputPath);

if (platform() === "darwin") {
  execFileSync("codesign", ["--remove-signature", outputPath]);
}

// this only works when this script is invoked via "scripts" in package.json
execFileSync(
  "postject",
  [
    outputPath,
    "NODE_SEA_BLOB",
    "build/sea-prep.blob",
    "--sentinel-fuse",
    "NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2",
  ],
  { shell: true, encoding: "utf8" }
);
