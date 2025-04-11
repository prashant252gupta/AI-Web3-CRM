// backend/models/Deal.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
    title: String,
    status: String,
    value: String,
    stage: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Deal', dealSchema);
