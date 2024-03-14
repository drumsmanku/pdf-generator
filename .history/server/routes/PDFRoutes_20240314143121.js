const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');

router.use(cors());
const PDFDocument = require('pdfkit');
const fs = require('fs');


router.post('/generate-pdf', async (req, res) => {
  const htmlContent = req.body.htmlContent;

  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the PDF document to a writable stream
  const pdfStream = doc.pipe(fs.createWriteStream('products.pdf'));

  // Convert HTML content to PDF
  doc.text(htmlContent);

  // End the document
  doc.end();

  // Wait for the PDF to be fully written
  pdfStream.on('finish', () => {
    // Send the file as a response
    res.download('products.pdf', 'products.pdf', (err) => {
      if (err) {
        console.error('Error downloading PDF:', err);
        res.status(500).send('Error downloading PDF');
      } else {
        // Delete the PDF file after it's downloaded
        fs.unlinkSync('products.pdf');
      }
    });
  });
});
module.exports=router