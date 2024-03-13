const express= require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();

dotenv.config()
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get('/',(req, res)=>{
  res.send('success')
})
const authenticationRoutes = require('./Routes/AuthenticationRoutes')
const pdfRoute= require('./Routes/PDFRoutes')
app.use(authenticationRoutes)
app.use(pdfRoute)

app.listen(process.env.PORT, ()=>{
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('listening on port ' + process.env.PORT)
  }).catch(err=>console.log(err))
})