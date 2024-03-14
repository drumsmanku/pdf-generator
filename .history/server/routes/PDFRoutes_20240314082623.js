const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const mongoose = require('mongoose');
var pdfSchema = new Schema({}, { strict: false });
const Pdf = mongoose.model('Pdf', pdfSchema);

router.post('/generate-pdf', async (req, res) => {
  const { htmlContent } = req.body; 
  var pdfData=new Pdf(htmlContent);
  pdfData.save();
  
  const browser = await puppeteer.launch({
    headless: true,
    devtools: true,
    args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        '--disable-features=BlockInsecurePrivateNetworkRequests'
    ]
});
  const page = await browser.newPage();
  
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' }); 
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