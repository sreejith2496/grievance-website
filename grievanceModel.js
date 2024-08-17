const mongoose = require('mongoose');

const grievanceSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    description: { type: String, required: true }
    // Remove `supportingDocument` if not used
});

module.exports = mongoose.model('Grievance', grievanceSchema);
