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
      // Generate a random file name
      const fileName = `pdf_${Date.now()}.pdf`;
      const filePath = path.join(__dirname, 'pdfs', fileName);

      // Save the PDF buffer to a file
      fs.writeFileSync(filePath, pdfBuffer);

      // Provide the link for downloading the PDF
      const downloadLink = `${req.protocol}://${req.get('host')}/pdfs/${fileName}`;
      res.json({ downloadLink });
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

module.exports=router