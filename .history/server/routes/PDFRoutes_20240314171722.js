const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
const { generatePdf } = require('html-pdf-node');
const fs = require('fs');
const path = require('path');

router.use(cors());

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

      // Set headers to prompt the browser to download the file
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

      // Provide the direct download link
      res.download(filePath, fileName, (err) => {
        if (err) {
          // Handle error, but keep in mind the response may be partially-sent
          // so check res.headersSent
          console.error(err);
          if (!res.headersSent) {
            res.status(500).send('Error downloading file');
          }
        }
        // Delete the file after sending it to the client
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

module.exports = router;
