// routes/pdfRoute.js
const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();

router.post('/generate-pdf', (req, res) => {
  const products = req.body;
  
  // Start PDF generation
  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfData),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'attachment;filename=products.pdf',
    }).end(pdfData);
  });

  // PDF Content
  doc.fontSize(25).text('Product Details', { align: 'center' });
  products.forEach((prod, index) => {
    doc.fontSize(10).text(`Product Name: ${prod.name}, Price: ${prod.price}, Total: ${prod.quantity * prod.price}, GST: ${18 * ((prod.price * prod.quantity) / 100)}`, {
      align: 'left',
      indent: 5,
      height: 2,
      ellipsis: true,
    }).moveDown();
  });
  
  // Finalize the PDF and end the stream
  doc.end();
});

module.exports = router;
