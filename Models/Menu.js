const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuItemsSchema = Schema({
    dishName: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('menuitem', menuItemsSchema);
