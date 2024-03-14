const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
const { generatePdf } = require('html-pdf-node');
const fs = require('fs');
const path = require('path');

router.use(cors());
router.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));


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