// The World in One Picture — 20 November 2026.
// Entrypoint for the make.fun news-image-20261120 bounty.
// The poster itself is rendered ahead of time into entry.png next to this
// file; all this program does is place that exact image where the grader
// expects it, then prove the copy is byte-for-byte identical.

import { copyFile, mkdir, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The folder holding this script is the repository root at grading time
// (a read-only mount), so the poster is always found beside it.
const here = dirname(fileURLToPath(import.meta.url));
const posterPath = join(here, "entry.png");

// The grader hands out a writable folder for the result. It is /output by
// contract; a command-line argument or OUTPUT_DIR lets a human run this
// anywhere else for a local check without touching that contract.
function pickDestination(): string {
  const fromArgs = process.argv[2];
  if (fromArgs !== undefined && fromArgs !== "") return fromArgs;
  const fromEnv = process.env.OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv !== "") return fromEnv;
  return "/output";
}

async function digestOf(path: string): Promise<string> {
  const bytes = await readFile(path);
  return createHash("sha256").update(bytes).digest("hex");
}

// Refuse to hand over a file that is not an image at all: a JPEG starts
// with FF D8 FF and a PNG with its eight-byte signature. Anything else
// means the render step produced garbage, and failing here is far better
// than shipping it to the judge.
async function checkLooksLikeImage(path: string): Promise<void> {
  const head = await readFile(path).then((b) => b.subarray(0, 8));
  const jpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
  const png =
    head[0] === 0x89 &&
    head[1] === 0x50 &&
    head[2] === 0x4e &&
    head[3] === 0x47;
  if (!jpeg && !png) {
    throw new Error(`poster at ${path} is neither a JPEG nor a PNG image`);
  }
}

async function run(): Promise<void> {
  const targetDir = pickDestination();
  const targetPath = join(targetDir, "entry.png");

  await checkLooksLikeImage(posterPath);
  await mkdir(targetDir, { recursive: true });
  await copyFile(posterPath, targetPath);

  const sourceHash = await digestOf(posterPath);
  const deliveredHash = await digestOf(targetPath);
  if (sourceHash !== deliveredHash) {
    throw new Error(
      `delivered image differs from the poster (source ${sourceHash}, delivered ${deliveredHash})`,
    );
  }

  const delivered = await readFile(targetPath);
  console.log(
    `delivered ${delivered.length} bytes to ${targetPath} (sha256 ${deliveredHash})`,
  );
}

run().catch((problem: unknown) => {
  console.error(problem instanceof Error ? problem.message : problem);
  process.exit(1);
});
