import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const baseUrl = process.env.PREVIEW_BASE_URL || 'http://localhost:8000';
const outputDirectory = path.join(process.cwd(), 'public', 'project-previews');
const templateSlugs = [
  'buildinbyte-luxury-hotel',
  'luxury-hotel',
  'real-estate',
  'elecstore',
  'kanchimarket',
  'scsvmv',
  'hostel-management',
];

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

try {
  for (const slug of templateSlugs) {
    const url = `${baseUrl}/templates/${slug}/index.html`;
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
    if (!response?.ok()) throw new Error(`${url} returned ${response?.status() ?? 'no response'}`);

    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(800);

    const png = await page.screenshot({ type: 'png', fullPage: false });
    const outputPath = path.join(outputDirectory, `${slug}.webp`);
    await sharp(png).webp({ quality: 84, effort: 5 }).toFile(outputPath);
    console.log(`Captured ${slug}`);
  }
} finally {
  await browser.close();
}
