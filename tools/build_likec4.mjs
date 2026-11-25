// Диаграммы LikeC4 для колоды: исходник <deck>/likec4/*.c4 → web-компонент и снимки для телефона.
//
//   node tools/build_likec4.mjs <deck>
//
// Что получается (всё коммитится, сайт раздаётся без сборки):
//   <deck>/likec4/views.js   — web-компонент <likec4-view view-id="…"> со всеми видами модели (~3 МБ):
//                              страница грузит его лениво, только на десктопе и только на слайде с диаграммой
//                              (components/likec4.js), поэтому первая загрузка колоды его не включает;
//   <deck>/img/c4-<view>.webp — снимок каждого вида: на телефоне вместо интерактивной схемы, на десктопе —
//                              пока компонент грузится.
// Нужны node, сеть к npm (likec4 запускается через npx точной версии), Playwright с Chromium
// (PW=<путь к playwright>, CHROME=<путь к Chrome> — как в tools/check_mobile.mjs) и python3 с Pillow для webp.
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const LIKEC4 = 'likec4@1.61.1';           // точная версия: два запуска подряд дают тот же файл
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || 'playwright');
const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const deck = process.argv[2];
if (!deck || !fs.existsSync(path.join(ROOT, deck, 'likec4'))) {
  console.error('usage: node tools/build_likec4.mjs <deck>  (нужна папка <deck>/likec4 с *.c4)');
  process.exit(2);
}
const src = path.join(ROOT, deck, 'likec4');
const out = path.join(src, 'views.js');
const imgDir = path.join(ROOT, deck, 'img');
fs.mkdirSync(imgDir, { recursive: true });

// 1. web-компонент
if (!process.env.SKIP_GEN) execFileSync("npx", ["--yes", LIKEC4, 'gen', 'webcomponent', src, '-o', out], { stdio: ['ignore', 'ignore', 'inherit'] });
console.log(`✓ ${path.relative(ROOT, out)} ${Math.round(fs.statSync(out).size / 1024)} КБ`);

// 2. виды модели — по объявлениям `view <id>` в исходниках
const views = fs.readdirSync(src).filter((f) => f.endsWith('.c4'))
  .flatMap((f) => [...fs.readFileSync(path.join(src, f), 'utf8').matchAll(/^\s*view\s+([A-Za-z0-9_]+)/gm)].map((m) => m[1]));

// 3. снимки: страница с одним видом, обрезка по узлам и связям схемы
const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/__snap') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`<!doctype html><meta charset="utf-8"><body style="margin:0;background:#efeee8"><div style="width:1600px;height:1000px">
<likec4-view view-id="${u.searchParams.get('v').replace(/[^\w]/g, '')}" browser="false" color-scheme="light"
  ></likec4-view></div>
<script type="module" src="/${deck}/likec4/views.js"></script>`);
    return;
  }
  const p = path.join(ROOT, decodeURIComponent(u.pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.statusCode = 404; res.end(); return; }
  res.setHeader('Content-Type', p.endsWith('.js') ? 'text/javascript' : 'application/octet-stream');
  fs.createReadStream(p).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
for (const v of views) {
  await page.goto(`${base}/__snap?v=${v}`);
  await page.waitForSelector('likec4-view', { state: 'attached' });
  await page.waitForFunction(() => {
    const r = document.querySelector('likec4-view')?.shadowRoot;
    const box = r && r.querySelector('[data-likec4-instance]');
    return box && box.getBoundingClientRect().height > 100;
  }, null, { timeout: 30000 });
  await page.waitForTimeout(3000);   // шрифты и подгонка вида под рамку
  // рамка вида держит пропорции схемы (aspect-ratio) — снимаем ровно её
  const clip = await page.evaluate(() => {
    const b = document.querySelector('likec4-view').shadowRoot.querySelector('[data-likec4-instance]').getBoundingClientRect();
    return { x: b.left, y: b.top, width: b.width, height: b.height };
  });
  const png = path.join(imgDir, `c4-${v}.png`);
  await page.screenshot({ path: png, clip });
  const webp = png.replace(/\.png$/, '.webp');
  execFileSync('python3', ['-c',
    'import sys; from PIL import Image; im = Image.open(sys.argv[1]).convert("RGB"); ' +
    'w = 1400; im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS) if im.width > w else im; ' +
    'im.save(sys.argv[2], "WEBP", quality=80, method=6)', png, webp]);
  fs.unlinkSync(png);
  console.log(`✓ ${path.relative(ROOT, webp)} ${Math.round(fs.statSync(webp).size / 1024)} КБ`);
}
await browser.close();
server.close();
