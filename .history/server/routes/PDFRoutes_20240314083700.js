const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
router.use(cors());


router.post('/generate-pdf', async (req, res) => {
  const { htmlContent } = req.body; 
  
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
  db.collection('html_contents').insertOne({ htmlContent }, (err, result) => {
    if (err) {
      console.error('Error inserting HTML content into MongoDB:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('HTML content saved to MongoDB');

    // Send PDF as response
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfBuffer),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=download.pdf',
    }).end(pdfBuffer);
  });
});
module.exports=router