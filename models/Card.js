const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    listId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    position: {
        type: Number,
        required: false
    },
});

module.exports = Card = mongoose.model('card', CardSchema);