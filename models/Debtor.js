const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
const DebtorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    debt: {
        type: Number,
        required: false,
        default: 0
    },
    phone: {
        type: String,
        required: false,
        default: ''
    }
});
DebtorSchema.plugin(timestamp)

const Debtor = mongoose.model('Debtor', DebtorSchema);
module.exports = Debtor;