const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');

router.use(cors());
const PDFDocument = require('pdfkit');


router.post('/generate-pdf', async (req, res) => {

  const htmlContent = req.body.htmlContent;

  // Create a new PDF document
  const doc = new PDFDocument();

  // Pipe the PDF document to the response
  doc.pipe(res);

  // Convert HTML content to PDF
  doc.text(htmlContent);

  // End the document
  doc.end();

  // Set response headers for PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
});
module.exports=router