const mongoose = require('mongoose');
const courtDateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    datetime: {
        type: Date,
        min: [function () {
            const date = new Date(this.start)
            const validDate = new Date(date.setHours(date.getHours() + 1))
            return validDate
        },
            "Court Date must be set after today"],
        required: true
    },
    case_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Case', required: true }
});

module.exports = mongoose.model('CourtDate', courtDateSchema);