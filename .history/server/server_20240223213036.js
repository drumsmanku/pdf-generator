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

const Form = mongoose.model('Form', formSchema);

app.use(bodyParser.json());

app.post('/submit-form', async (req, res) => {
  try {
    const cityQuery = req.query.city; // Get the city query parameter if it exists
    const formData = new Form(req.body);
    const savedFormData = await formData.save();

    // Use the query parameter to override the city from form data if it exists
    const filterCity = cityQuery || savedFormData.city; 
    const doctors = await Doctor.find({ city: new RegExp(filterCity, 'i') }).exec();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error saving form data', error });
  }
});

const doctorSchema = new mongoose.Schema({
  name: String,
  expertise: String,
  city: String,
  imgUrl:String
});

const Doctor = mongoose.model('Doctor', doctorSchema);
app.listen(process.env.PORT, ()=>{
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('listening on port ' + process.env.PORT)
  }).catch(err=>console.log(err))
})