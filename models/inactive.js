const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inactiveItemSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: false

    },
    quantity: {
        type: Number,
        required:true
    },
    warehouse_location: {
        type: String,
        required: true
    },
    deletion_comments: {
        type: String,
        required: true
    }
},{timestamps: true});

const deletedItemModel = mongoose.model('deletedItem',inactiveItemSchema);

module.exports = deletedItemModel;