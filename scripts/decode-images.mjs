// Ensures public/images/ exists at build time.
// 1) If images already present -> done.
// 2) Else decode any base64 payloads in public/images-b64/*.b64.
// 3) Else download the image bundle from the fallback URL (used on hosts
//    where binary assets cannot travel through git).
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const BUNDLE_URL = "https://temp.sh/tDMgi/raftaar247-app.tar.gz"; // expires 2026-10-03
const outDir = "public/images";
const srcDir = "public/images-b64";

mkdirSync(outDir, { recursive: true });
if (existsSync(join(outDir, "hero.jpg"))) {
  console.log("decode-images: images already present");
  process.exit(0);
}

if (existsSync(srcDir) && readdirSync(srcDir).some((f) => f.endsWith(".b64"))) {
  let count = 0;
  for (const f of readdirSync(srcDir)) {
    if (!f.endsWith(".b64")) continue;
    const out = join(outDir, f.replace(/\.b64$/, ""));
    const buf = Buffer.from(readFileSync(join(srcDir, f), "utf8").trim(), "base64");
    if (existsSync(out) && readFileSync(out).equals(buf)) continue;
    writeFileSync(out, buf);
    count++;
  }
  console.log(`decode-images: decoded ${count} file(s) from b64`);
  process.exit(0);
}

console.log("decode-images: fetching image bundle from fallback URL...");
execSync(`curl -fsSL -X POST ${BUNDLE_URL} -o /tmp/imgs.tar.gz`, { stdio: "inherit" });
execSync(`rm -rf /tmp/imgs && mkdir -p /tmp/imgs && tar -xzf /tmp/imgs.tar.gz -C /tmp/imgs ./public/images`, { stdio: "inherit" });
cpSync("/tmp/imgs/public/images", outDir, { recursive: true });
console.log("decode-images: fetched images from bundle");
