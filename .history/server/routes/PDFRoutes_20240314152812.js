const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');



router.post('/generate-pdf', async (req, res) => {
  try {
    const existingPdfBytes = await req.body;

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Failed to generate PDF:', error);
    res.status(500).send('Server Error');
  }
});
module.exports=router