import mongoose from 'mongoose';

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

const Deal = mongoose.model('Deal', dealSchema);
export default Deal;
