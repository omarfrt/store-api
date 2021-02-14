const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const buyerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
    email:{type: String, required: true},
    phone:{type: String, required: true},
    address:[{type: String, required: true}],
    cin:{type: String, required: true}
});

buyerSchema.plugin(timestamps);

module.exports = mongoose.model('Buyer', buyerSchema);