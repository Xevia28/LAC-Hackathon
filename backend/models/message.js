const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);