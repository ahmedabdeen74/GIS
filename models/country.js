const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name:  String ,
  population: Number ,
  Qara:  String ,
  area:  String ,
  currency:  String ,
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: [Number],
  },
});

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;
