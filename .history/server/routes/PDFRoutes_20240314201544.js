const express = require('express');
const puppeteer = require('puppeteer');
const router = express.Router();
const cors = require('cors');
const { generatePdf } = require('html-pdf-node');
const { MongoClient, ObjectId } = require('mongodb');

router.use(cors());

// MongoDB connection URL
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'Database1';
const collectionName = 'notes';

// Function to connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return { client, collection };
}

router.post('/generate-pdf', async (req, res) => {
  try {
    const { htmlContent } = req.body;

    let options = { format: 'A4' };

    let file = { content: htmlContent };
    generatePdf(file, options).then(async pdfBuffer => {
      console.log(pdfBuffer);
      // Save PDF to MongoDB
      const { client, collection } = await connectToMongoDB();
      const result = await collection.insertOne({ pdf: pdfBuffer });
      const pdfId = result.insertedId;

      // Close MongoDB connection
      await client.close();

      // Return download link
      const downloadLink = `http://localhost:4000/download-pdf/${pdfId}`;
      res.json({ downloadLink });
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

router.get('/download-pdf/:pdfId', async (req, res) => {
  try {
    const { pdfId } = req.params;

    // Connect to MongoDB
    const { client, collection } = await connectToMongoDB();

    // Retrieve PDF buffer from MongoDB
    const pdfRecord = await collection.findOne({ _id: ObjectId(pdfId) });
    const pdfBuffer = pdfRecord.pdf;

    // Close MongoDB connection
    await client.close();

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=downloaded.pdf');

    // Send PDF buffer as response
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    res.status(500).send('Error downloading PDF');
  }
});

module.exports = router;
