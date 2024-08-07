const mongoose = require('mongoose');
const caseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    type: { type: String, default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lawyer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    document_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' }
});

module.exports = mongoose.model('Case', caseSchema);
