const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
router.use(cors());


router.post('/generate-pdf', async (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  const { products } = req.body; 
  await page.setBypassCSP(true)
  const browser = await puppeteer.launch({ headless: false, args: [ '--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox', '--disable-web-security', '--disable-features=IsolateOrigins', '--disable-site-isolation-trials', '--disable-features=BlockInsecurePrivateNetworkRequests', ], devtools: true, defaultViewport: { hasTouch: true, isMobile: true, height: 1080, width: 1920, }, });
  const page = await browser.newPage();
  
  await page.setContent(products, { waitUntil: 'networkidle0' }); 
  await page.waitForSelector('.black-back');
  
  const pdfBuffer = await page.pdf({ format: 'A4' });
  
  await browser.close();
  
  
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(pdfBuffer),
    'Content-Type': 'application/pdf',
    'Content-disposition': 'attachment;filename=download.pdf',
  }).end(pdfBuffer);
});
module.exports=router