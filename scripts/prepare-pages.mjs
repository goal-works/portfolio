import { access, copyFile, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../out/", import.meta.url);

await access(new URL("index.html", outputDirectory));
await writeFile(new URL(".nojekyll", outputDirectory), "");

const socialImages = ["home", "evalforge", "agentscope", "estate-ai", "launchkit-ai"];
await Promise.all(
  socialImages.map((name) =>
    copyFile(
      new URL(`og/${name}`, outputDirectory),
      new URL(`og/${name}.png`, outputDirectory),
    ),
  ),
);
