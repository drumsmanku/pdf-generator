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
// const AuthenticationRoutes=require('./Routes/AuthenticationRoutes.js')
// app.use(AuthenticationRoutes)

app.listen(process.env.PORT, ()=>{
  mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('listening on port ' + process.env.PORT)
  }).catch(err=>console.log(err))
})