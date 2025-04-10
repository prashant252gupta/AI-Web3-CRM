// models/Contact.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: String,
    phone: String,
    company: String,
    tags: [String],
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
