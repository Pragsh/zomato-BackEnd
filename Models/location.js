const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const locationSchema = Schema({
    location_Id :{
        type : String,
        required : true
    },
    City : {
         type: String,
        required : true
    },
    city_id: {
        type: Number,
        required: true
    },
    country_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Location',locationSchema , 'Locations');