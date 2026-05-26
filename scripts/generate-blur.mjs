#!/usr/bin/env node
// Generates tiny blurred base64 placeholders (LQIP) for every photo in
// public/assets/images and writes them to lib/blur-data.json keyed by public
// path. next/image renders these instantly while the full image streams in,
// which fixes the "images pop in one by one" feel on slow connections.
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, extname, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SCAN_DIR = join(ROOT, "public", "assets", "images");
const PUBLIC_DIR = join(ROOT, "public");
const OUT_FILE = join(ROOT, "lib", "blur-data.json");

const BLUR_WIDTH = 20;
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile() && EXTS.has(extname(entry.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

function toPublicPath(filePath) {
  return "/" + relative(PUBLIC_DIR, filePath).split(sep).join("/");
}

async function blurFor(filePath) {
  const buf = await sharp(filePath)
    .resize({ width: BLUR_WIDTH, withoutEnlargement: true })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

async function main() {
  let files;
  try {
    files = await walk(SCAN_DIR);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`No ${SCAN_DIR} directory; nothing to do.`);
      return;
    }
    throw err;
  }

  files.sort();
  const map = {};
  for (const file of files) {
    const key = toPublicPath(file);
    try {
      map[key] = await blurFor(file);
    } catch (err) {
      console.error(`  ERROR ${key}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  await writeFile(OUT_FILE, JSON.stringify(map, null, 2) + "\n");

  const totalBytes = Object.values(map).reduce((n, v) => n + v.length, 0);
  console.log(
    `Wrote ${Object.keys(map).length} blur placeholder(s) to ${relative(ROOT, OUT_FILE)} (~${(totalBytes / 1024).toFixed(1)}KB inline).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
