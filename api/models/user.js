//////////////// THIS IS FOR THE ADMIN ! ///////////////
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    firstlogin: {type: Boolean, required: false},
    firstname:{type: String, required: false},
    lastname:{type: String, required: false},
    phone:{type: String, required: false},
    address:[{type: String, required: false}],
    cin:{type: String, required: false},
    cart:[{ type:mongoose.Schema.Types.ObjectId, ref:'Product'}],
    wishList:[{ type:mongoose.Schema.Types.ObjectId, ref:'Product'}]
});

userSchema.plugin(timestamps);

module.exports = mongoose.model('User', userSchema);
