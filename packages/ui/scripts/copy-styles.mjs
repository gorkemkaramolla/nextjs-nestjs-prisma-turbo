import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const filePath = fileURLToPath(import.meta.url);
const rootPath = join(dirname(filePath), "..");
const sourcePath = join(rootPath, "src", "styles.css");
const outputPath = join(rootPath, "dist", "styles.css");

async function executeCopy() {
  await mkdir(dirname(outputPath), { recursive: true });
  await copyFile(sourcePath, outputPath);
}

executeCopy().catch((error) => {
  console.error("Failed to copy styles.css", error);
  process.exit(1);
});

