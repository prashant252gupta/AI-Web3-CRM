// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ceo', 'biz-dev', 'dev', 'support'], // adjust as needed
        required: true,
    },
    walletAddress: {
        type: String,
        default: '',
    },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
