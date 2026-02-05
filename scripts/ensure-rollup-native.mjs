// scripts/ensure-rollup-native.mjs
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function log(msg) {
  console.log(`[ensure-rollup-native] ${msg}`);
}

function exists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

function tryResolve(pkgName) {
  try {
    return require.resolve(pkgName);
  } catch {
    return null;
  }
}

function main() {
  // Only needed on Linux x64 (Cloudflare build env)
  if (process.platform !== "linux" || process.arch !== "x64") {
    log(`Skipping (platform=${process.platform}, arch=${process.arch})`);
    return;
  }

  // If already present, nothing to do
  const nativePkg = "@rollup/rollup-linux-x64-gnu";
  const resolvedNative = tryResolve(nativePkg);
  if (resolvedNative) {
    log(`${nativePkg} already present.`);
    return;
  }

  // Determine rollup version from installed rollup
  const rollupPkgJsonPath = tryResolve("rollup/package.json");
  if (!rollupPkgJsonPath) {
    log("rollup is not installed yet; nothing to do.");
    return;
  }

  const rollupPkg = JSON.parse(fs.readFileSync(rollupPkgJsonPath, "utf8"));
  const rollupVersion = rollupPkg.version;

  if (!rollupVersion) {
    throw new Error("Could not determine rollup version from rollup/package.json");
  }

  log(`Missing ${nativePkg}. Installing version ${rollupVersion}...`);

  // Install into the workspace that actually builds Vite (admin-ui)
  // --no-save so we don't mutate package.json during CI
  execSync(
    `npm -w apps/admin-ui i --no-save ${nativePkg}@${rollupVersion}`,
    { stdio: "inherit" }
  );

  // Verify
  const resolvedAfter = tryResolve(nativePkg);
  if (!resolvedAfter) {
    throw new Error(`Install completed but ${nativePkg} still not resolvable.`);
  }

  log(`Installed and verified: ${nativePkg}`);
}

main();
