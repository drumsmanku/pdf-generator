const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
const { generatePdf } = require('html-pdf-node');
router.use(cors());


router.post('/generate-pdf', async (req, res) => {
  try {
    const { htmlContent } = req.body;
    
    let options = { format: 'A4' };
    
    let file = { content: htmlContent };
    generatePdf(file, options).then(pdfBuffer => {
      res.contentType('application/pdf');
      res.send(pdfBuffer);
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});
module.exports=router