const mongoose = require('mongoose');

module.exports=mongoose.model('Doctors', {
  name: String,
  phoneNumber: String,
  age: Number,
  city: String,
  company: String,
  chiefComplaints: String,
  previousExperience: Boolean,

})