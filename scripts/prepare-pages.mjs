import { access, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../out/", import.meta.url);

await access(new URL("index.html", outputDirectory));
await writeFile(new URL(".nojekyll", outputDirectory), "");
