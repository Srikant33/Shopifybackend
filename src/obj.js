const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    warehouse_location: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required:true
    }
},{timestamps: true});

const ItemModel = mongoose.model('Item',itemSchema);

module.exports = ItemModel;
