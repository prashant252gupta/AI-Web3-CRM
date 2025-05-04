import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    company: String,
    tags: [String],
    notes: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Contact', contactSchema);
