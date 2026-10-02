import { chromium } from 'playwright';
import { mkdirSync, writeFileSync, createWriteStream } from 'fs';
import { join, extname } from 'path';
import https from 'https';
import http from 'http';

const outDir = 'docs/ai/demos/masterbrand/images';
mkdirSync(outDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const file = createWriteStream(dest);
    mod
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(dest);
        });
      })
      .on('error', reject);
  });
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.masterbrandcabinets.com/', {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(7000);
await page.evaluate(() => {
  document
    .querySelectorAll('[class*=cookie],[class*=modal],[class*=popup],[id*=cookie]')
    .forEach((el) => {
      el.style.display = 'none';
    });
});
await page.waitForTimeout(2000);

const images = await page.evaluate(() => {
  return [...document.querySelectorAll('img')]
    .map((img, i) => ({
      i,
      src: img.currentSrc || img.src,
      alt: img.alt || '',
      w: img.naturalWidth || img.width,
      h: img.naturalHeight || img.height,
    }))
    .filter((x) => x.src && x.src.startsWith('http') && x.w > 80);
});

await browser.close();

const unique = [];
const seen = new Set();
for (const item of images) {
  const key = item.src.split('?')[0];
  if (seen.has(key)) continue;
  seen.add(key);
  unique.push(item);
}

const manifest = [];
let idx = 0;
for (const item of unique.slice(0, 35)) {
  try {
    const clean = item.src.split('?')[0];
    let ext = extname(clean) || '.jpg';
    if (ext.length > 5) ext = '.jpg';
    const name = 'img-' + String(idx).padStart(2, '0') + ext;
    const dest = join(outDir, name);
    await download(item.src, dest);
    manifest.push({
      index: idx,
      localFile: name,
      src: item.src,
      alt: item.alt,
      width: item.w,
      height: item.h,
      uploadStatus: 'downloaded',
    });
    console.log('OK', name, (item.alt || '').slice(0, 50));
    idx++;
  } catch (e) {
    console.log('FAIL', item.src, e.message);
  }
}
writeFileSync(join(outDir, 'image-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Done', manifest.length, 'images');
