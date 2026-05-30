import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const images = [
  "https://framerusercontent.com/images/w5rRTcZlyNjchgev3qGcQcEdA4.png?scale-down-to=512&width=282&height=1013",
  "https://framerusercontent.com/images/2q82sqseGi8szDiOuBWqQaBz5k.png?scale-down-to=512&width=898&height=892",
  "https://framerusercontent.com/images/BMk9tbBUQoj1TbGSpyuzVtpEI.png?width=354&height=353",
  "https://framerusercontent.com/images/pIJQNvKwXzQWb9Be5qUhoITihY.png?scale-down-to=1024&width=1836&height=1836",
  "https://framerusercontent.com/images/wOeVsLZQBng4oWuL9A4Yl4g1NB0.png?scale-down-to=512&width=640&height=640",
  "https://framerusercontent.com/images/Ib2MgBDUnLnhAsZEGDsaXTRCyEc.png?scale-down-to=1024&width=736&height=1030",
  "https://framerusercontent.com/images/jdLgBfSLwKTClxqYuahwosnQ0ao.png?scale-down-to=512&width=675&height=900",
  "https://framerusercontent.com/images/UYw9YXInfHuvyVQzhOZZzoZBPh4.png?scale-down-to=512&width=736&height=575",
  "https://framerusercontent.com/images/zBTrYExuPA4oelyKSUOT0Jd5Jw.png?width=1024&height=1024",
  "https://framerusercontent.com/images/EXDOfJMplEjncYGaW1AXyHUrGo.png?scale-down-to=1024&width=1913&height=1538",
  "https://framerusercontent.com/images/AgBD7j2uv82zRz8yWkU2JJqXUU.png?scale-down-to=512&width=736&height=735",
  "https://framerusercontent.com/images/r0cKKLDepuyC861bflopOCb3QvM.png?scale-down-to=512&width=418&height=569",
  "https://framerusercontent.com/images/QVQeDV5JeNYdEyo4R2DlbzUAw.png?width=1080&height=660",
  "https://framerusercontent.com/images/tQZK8bAxzmm6UcxN8lrkuLrsPTs.png?scale-down-to=1024&width=1280&height=1280",
  "https://framerusercontent.com/images/dReV0XQhJYgPVKg5SFc8B4qk.png?width=427&height=418",
  "https://framerusercontent.com/images/rksKjHdY89q3Pqx7B0oMmuDZYAo.png?scale-down-to=512&width=453&height=716",
  "https://framerusercontent.com/images/IZRnrksxk6jlauzVdxiPn0G08Hk.png?width=225&height=225",
  "https://framerusercontent.com/images/duEM63itto4Se3V5U7UC7uZb8.png?scale-down-to=512&width=910&height=432",
  "https://framerusercontent.com/images/iB6uzsB6l2paDhNKJwSzJyvDSzw.png?scale-down-to=512",
  "https://framerusercontent.com/images/0ZWBCWQYC21jDSLYdizuadPxng.png?width=4008&height=1050",
  "https://framerusercontent.com/images/xleyZ28tx2lxtCNCKRFTGYdUqTI.png?width=1705&height=912",
  "https://framerusercontent.com/images/TQSRecTBvtbBcvjryL55dJtDtU.png?width=3126&height=1206",
  "https://framerusercontent.com/images/mqKjnAfYlJoPjLE80JkaFFBYGyE.png?width=600&height=693",
  "https://framerusercontent.com/images/22tCq30y4soIdZfqBkwOCdumsg.png?width=175&height=183",
  "https://framerusercontent.com/images/NhreDx8SlTfulVIsJ34VmaolzQ.png?width=3138&height=3033",
  "https://framerusercontent.com/images/vzEazRVQV74hjNvzYBxjKp4Q8.png?scale-down-to=512",
];

const favicons = [
  ["https://framerusercontent.com/images/e9wWiZ83DOREWks6j3964O8SU5M.png", "seo/favicon.png"],
  ["https://framerusercontent.com/images/Juqmq5xz1vvLJTiS4Lb7DzX6TvA.png", "seo/apple-icon.png"],
];

const font = ["https://framerusercontent.com/assets/rTj1xxnpP5jTWpRxKrqvFUeAQ8.woff2", "../src/fonts/HistoriaSkyScript.woff2"];

const cleanName = (url) => url.split('?')[0].split('/').pop();

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  console.log("✓", path.relative(process.cwd(), dest));
}

async function batch(items, fn, size = 4) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map(fn));
  }
}

const pub = path.resolve("public");

await batch(images, (url) => download(url, path.join(pub, "images", cleanName(url))).catch(e => console.error("✗", url, e.message)));
await batch(favicons, ([url, dest]) => download(url, path.join(pub, dest)).catch(e => console.error("✗", url, e.message)));
await download(font[0], path.resolve("scripts", font[1])).catch(e => console.error("✗ font", e.message));
console.log("Done.");
