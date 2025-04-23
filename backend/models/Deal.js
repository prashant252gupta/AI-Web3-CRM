import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, required: true },
    value: { type: Number, required: true },
    stage: { type: String, required: true },
    // ← new field: reference to a Contact
    contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Deal', dealSchema);
