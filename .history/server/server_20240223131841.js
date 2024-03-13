const express= require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();

dotenv.config()
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res)=>{
  res.send('success')
})


const formSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  age: Number,
  city: String,
  company: String,
  chiefComplaints: String,
  previousExperience: Boolean,
});

// Create a model based on the schema
const Form = mongoose.model('Form', formSchema);

app.use(bodyParser.json());

// Endpoint to receive form data and save it to the database
app.post('/submit-form', async (req, res) => {
  try {
    const formData = new Form(req.body);
    const savedFormData = await formData.save();
    
    // Once saved, find doctors based on the `city` field
    const doctors = await Doctor.find({ city: savedFormData.city }).exec();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error saving form data', error });
  }
});

// Define a schema for doctor data
const doctorSchema = new mongoose.Schema({
  name: String,
  expertise: String,
  city: String,
});

// Create a model for doctors
const Doctor = mongoose.model('Doctor', doctorSchema);
app.listen(process.env.PORT, ()=>{
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('listening on port ' + process.env.PORT)
  }).catch(err=>console.log(err))
})