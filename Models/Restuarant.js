const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    location_id: {
        type: Number
    },
    city_id: {
        type: Number
    },
    locality: {
        type: String
    },
    thumb: {
        type: Array
    },
    aggregate_rating: {
        type: Number
    },
    rating_text: {
        type: String
    },
    min_price: {
        type: Number
    },
    contact_number: {
        type: String
    },
    cuisine: {
        type: Array
    },
    mealtype_id: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('restuarant', restaurantSchema);
