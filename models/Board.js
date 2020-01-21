const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        required: false
    },
});

module.exports = Board = mongoose.model('board', BoardSchema);