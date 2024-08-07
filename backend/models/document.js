const mongoose = require('mongoose');
const documentSchema = new mongoose.Schema({
    ipfs_path: { type: String, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Document', documentSchema);