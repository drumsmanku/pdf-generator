const express= require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();
app.use(cors());


app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://flourishing-tiramisu-5c80ce.netlify.app/"
  )
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://flourishing-tiramisu-5c80ce.netlify.app/"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
app.options("*", (req, res) => {
  console.log("preflight");
  if (
    req.headers.origin === "https://pdf-generator-21.onrender.com" &&
    allowMethods.includes(req.headers["access-control-request-method"]) &&
    allowHeaders.includes(req.headers["access-control-request-headers"])
  ) {
    console.log("pass");
    return res.status(204).send();
  } else {
    console.log("fail");
  }
})

dotenv.config()
app.use(bodyParser.json());


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