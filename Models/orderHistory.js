const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const orderSchema = Schema({
    orderId :{
        type : String,
        required : true
    },
    userId :{
        type : String,
        required : true
    },
    total: {
        type: Number,
        required: true
    },
    restId: {
        type: String,
        required: true
    },
    restName: {
        type: String,
        required: true
    },
    items:{
          type: Array,
        required: true
    },
    date:{
        type: Date,
      required: true
  },
  status:{
    type: String,
    required: true

  }
})

module.exports = mongoose.model('orderhistory',orderSchema , 'orderhistory');