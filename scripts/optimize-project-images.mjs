import { readdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const projectDirectory = path.resolve("public/projects");

async function findPngFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findPngFiles(entryPath)
        : Promise.resolve(entryPath.endsWith(".png") ? [entryPath] : []);
    }),
  );
  return files.flat();
}

const files = await findPngFiles(projectDirectory);

await Promise.all(
  files.map((file) =>
    sharp(file)
      .webp({ effort: 6, quality: 82, smartSubsample: true })
      .toFile(file.replace(/\.png$/, ".webp")),
  ),
);

console.log(`Optimized ${files.length} project images`);
