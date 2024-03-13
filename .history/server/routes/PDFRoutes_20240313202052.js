const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();

router.post('/generate-pdf', async (req, res) => {
  const { htmlContent } = req.body; // Assume this is your HTML content for the page
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' }); // sets the page content and waits for no network connections for at least 500 ms.
  
  const pdfBuffer = await page.pdf({ format: 'A4' });
  
  await browser.close();
  
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(pdfBuffer),
    'Content-Type': 'application/pdf',
    'Content-disposition': 'attachment;filename=download.pdf',
  }).end(pdfBuffer);
});
module.exports=router