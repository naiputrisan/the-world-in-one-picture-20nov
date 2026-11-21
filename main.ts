// The World in One Picture — 20 November 2026 (make.fun news-image-20261120).
//
// The poster itself sits next to this file as entry.png. This program is the
// courier, not the artist: it inspects the picture, refuses to ship anything
// that breaks the contest limits, and then delivers the bytes unchanged to
// the output folder the grader reads.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only, no network access.

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BYTE_LIMIT = 1_048_576; // the contest caps the picture at 1 MiB
const SIDE_LIMIT = 1024; // and at 1024 px on either side

function fail(reason) {
  console.error(`entry refused: ${reason}`);
  process.exit(1);
}

// --- sniff the format from the leading bytes, never from the file name -----
function sniffFormat(bytes) {
  const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  const startsWithPng =
    bytes.length >= pngSignature.length &&
    pngSignature.every((value, index) => bytes[index] === value);
  if (startsWithPng) return 'png';
  const startsWithJpeg =
    bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (startsWithJpeg) return 'jpeg';
  return null;
}

// --- read the pixel size out of the header ---------------------------------
function pngSize(bytes) {
  // IHDR opens the file: its width and height are the two big-endian words
  // that follow the 8-byte signature, the chunk length and the "IHDR" tag.
  if (bytes.length < 24) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

function jpegSize(bytes) {
  // Walk the marker segments. A segment is 0xFF, a marker byte, then a
  // big-endian length that counts its own two bytes. The start-of-frame
  // markers (C0, C1, C2) carry height first and width second.
  let cursor = 2; // the SOI marker (FF D8) is already behind us
  while (cursor + 4 <= bytes.length) {
    if (bytes[cursor] !== 0xff) return null;
    const marker = bytes[cursor + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      if (cursor + 9 > bytes.length) return null;
      const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
      return { width: view.getUint16(cursor + 7), height: view.getUint16(cursor + 5) };
    }
    const segmentLength = (bytes[cursor + 2] << 8) | bytes[cursor + 3];
    if (segmentLength < 2) return null;
    cursor += 2 + segmentLength;
  }
  return null;
}

// --- validate, then deliver --------------------------------------------------
const picture = readFileSync(new URL('./entry.png', import.meta.url));

const format = sniffFormat(picture);
if (format === null) {
  fail('entry.png starts with neither the PNG signature nor the JPEG SOI marker');
}
if (picture.length > BYTE_LIMIT) {
  fail(`entry.png weighs ${picture.length} bytes; the limit is ${BYTE_LIMIT}`);
}

const size = format === 'png' ? pngSize(picture) : jpegSize(picture);
if (size === null) {
  fail(`the ${format} header ended before its dimensions could be read`);
}
if (size.width === 0 || size.height === 0) {
  fail('entry.png declares a zero width or height, which is not a picture');
}
if (size.width > SIDE_LIMIT || size.height > SIDE_LIMIT) {
  fail(`entry.png is ${size.width}x${size.height}; the limit is ${SIDE_LIMIT}x${SIDE_LIMIT}`);
}

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(targetDir, { recursive: true });
const targetFile = join(targetDir, 'entry.png');
writeFileSync(targetFile, picture);

// The grader runs this program twice and demands the same bytes both times,
// so prove the copy on disk is the picture we validated, byte for byte,
// before calling the delivery done.
const delivered = readFileSync(targetFile);
if (!delivered.equals(picture)) {
  fail('the file written to the output folder differs from the validated picture');
}

const digest = createHash('sha256').update(picture).digest('hex');
console.log(
  `delivered ${picture.length} bytes (${format}, ${size.width}x${size.height}) ` +
    `to ${targetFile}; sha256 ${digest}`,
);
