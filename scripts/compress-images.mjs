#!/usr/bin/env node
import { readdir, stat, rename, unlink } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SCAN_DIR = join(ROOT, "public");

const DEFAULT_TARGET_BYTES = 350_000;
const DEFAULT_THRESHOLD_BYTES = 400_000;
const DEFAULT_MAX_WIDTH = 1920;
const DEFAULT_QUALITY_STEPS = [78, 72, 66, 60];

// Per-file overrides keyed by basename. Use for above-the-fold or
// otherwise size-sensitive assets that need a tighter budget than the
// default. Brand logos are downscaled hard since they render small.
const FILE_OVERRIDES = {
  "hero-poster.jpg": { target: 160_000, threshold: 180_000, maxWidth: 1600, qualities: [72, 66, 60, 55] },
  "LOGO-color-block.png": { target: 60_000, threshold: 80_000, maxWidth: 1200 },
  "LOGO-color-horizontal.png": { target: 60_000, threshold: 80_000, maxWidth: 1200 },
  "LOGO-color-vertical.png": { target: 60_000, threshold: 80_000, maxWidth: 1200 },
  "LOGO-white-block.png": { target: 60_000, threshold: 80_000, maxWidth: 1200 },
  "LOGO-white-horizontal.png": { target: 60_000, threshold: 80_000, maxWidth: 1200 },
  "LOGO-white-vertical.png": { target: 60_000, threshold: 80_000, maxWidth: 1200 },
  "logo-compact.png": { target: 40_000, threshold: 60_000, maxWidth: 600 },
  "logo-horizontal.png": { target: 40_000, threshold: 60_000, maxWidth: 800 },
  "logo-stacked.png": { target: 40_000, threshold: 60_000, maxWidth: 600 },
};

function getBudget(filePath) {
  const name = basename(filePath);
  const override = FILE_OVERRIDES[name];
  return {
    target: override?.target ?? DEFAULT_TARGET_BYTES,
    threshold: override?.threshold ?? DEFAULT_THRESHOLD_BYTES,
    maxWidth: override?.maxWidth ?? DEFAULT_MAX_WIDTH,
    qualities: override?.qualities ?? DEFAULT_QUALITY_STEPS,
  };
}

const EXT_HANDLERS = {
  ".jpg": "jpeg",
  ".jpeg": "jpeg",
  ".png": "png",
  ".webp": "webp",
};

const CHECK_ONLY = process.argv.includes("--check");

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (ext in EXT_HANDLERS) out.push(full);
    }
  }
  return out;
}

function formatBytes(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}MB`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}KB`;
  return `${n}B`;
}

async function compressOnce(inputPath, format, quality, maxWidth) {
  const meta = await sharp(inputPath).metadata();
  let pipeline = sharp(inputPath, { failOn: "none" });

  if (meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (format === "jpeg") {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true, progressive: true });
  } else if (format === "png") {
    pipeline = pipeline.png({ quality, compressionLevel: 9, palette: true });
  } else if (format === "webp") {
    pipeline = pipeline.webp({ quality });
  }

  return pipeline.toBuffer();
}

async function compressFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  const format = EXT_HANDLERS[ext];
  const originalSize = (await stat(filePath)).size;
  const { threshold, maxWidth, qualities } = getBudget(filePath);

  let bestBuffer = null;
  let bestQuality = null;

  for (const quality of qualities) {
    const buf = await compressOnce(filePath, format, quality, maxWidth);
    bestBuffer = buf;
    bestQuality = quality;
    if (buf.length <= threshold) break;
  }

  if (!bestBuffer) {
    return { skipped: true, reason: "no output produced" };
  }

  if (bestBuffer.length >= originalSize) {
    return {
      skipped: true,
      reason: `re-encode larger than original (${formatBytes(bestBuffer.length)} ≥ ${formatBytes(originalSize)})`,
      originalSize,
    };
  }

  const tmpPath = join(dirname(filePath), `.${basename(filePath)}.tmp`);
  const fs = await import("node:fs/promises");
  await fs.writeFile(tmpPath, bestBuffer);
  try {
    await rename(tmpPath, filePath);
  } catch (err) {
    await unlink(tmpPath).catch(() => {});
    throw err;
  }

  return {
    skipped: false,
    originalSize,
    newSize: bestBuffer.length,
    quality: bestQuality,
    underTarget: bestBuffer.length <= threshold,
    threshold,
  };
}

async function main() {
  let allFiles;
  try {
    allFiles = await walk(SCAN_DIR);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`No ${SCAN_DIR} directory; nothing to do.`);
      return;
    }
    throw err;
  }

  const oversized = [];
  for (const file of allFiles) {
    const { size } = await stat(file);
    const { threshold } = getBudget(file);
    if (size > threshold) oversized.push({ file, size, threshold });
  }

  if (oversized.length === 0) {
    console.log("All images within size budget. Nothing to compress.");
    return;
  }

  console.log(
    `Found ${oversized.length} image(s) over their size budget (default ${formatBytes(DEFAULT_THRESHOLD_BYTES)}).`,
  );

  if (CHECK_ONLY) {
    for (const { file, size, threshold } of oversized) {
      console.log(`  ${file.replace(ROOT + "/", "")} — ${formatBytes(size)} (budget ${formatBytes(threshold)})`);
    }
    console.error(
      `\n--check failed: ${oversized.length} image(s) exceed their threshold. Run \`npm run compress:images\` to fix.`,
    );
    process.exitCode = 1;
    return;
  }

  let totalSaved = 0;
  let warnings = 0;

  for (const { file } of oversized) {
    const rel = file.replace(ROOT + "/", "");
    try {
      const result = await compressFile(file);
      if (result.skipped) {
        console.log(`  skip ${rel} — ${result.reason}`);
        continue;
      }
      const saved = result.originalSize - result.newSize;
      totalSaved += saved;
      const pct = ((saved / result.originalSize) * 100).toFixed(1);
      const flag = result.underTarget ? "" : ` ⚠ still over ${formatBytes(result.threshold)}`;
      console.log(
        `  ${rel}: ${formatBytes(result.originalSize)} → ${formatBytes(result.newSize)} (-${pct}%, q=${result.quality})${flag}`,
      );
      if (!result.underTarget) warnings += 1;
    } catch (err) {
      console.error(`  ERROR ${rel}: ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log(
    `\nDone. Saved ${formatBytes(totalSaved)} across ${oversized.length} file(s).` +
      (warnings ? ` ${warnings} file(s) remain above their budget — consider manual review.` : ""),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
