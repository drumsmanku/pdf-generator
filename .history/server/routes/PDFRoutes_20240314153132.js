const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
const { PDFDocument } = require('pdf-lib');



router.post('/generate-pdf', async (event, context) => {
  const { htmlContent } = JSON.parse(event.body);

  const doc = new PDFDocument();
  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=products.pdf'
      },
      body: pdfData.toString('base64'),
      isBase64Encoded: true,
    };
    context.succeed(response);
  });

  doc.text(htmlContent);
  doc.end();
});
module.exports=router