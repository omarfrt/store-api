const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [{  _id:{type: String, required: true},
    bookname: {type: String, required: true},
    hot:{type:Boolean , required : false},
    aboutbook: {type: String, required: true},
    authorname: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: {type: String, required: true},
   // quantity:Number,
    price: {type: Number, required: true},
    rating:{type: Number, required: false},
    productimgl:{type: String, required: false},
    productimgs:{type: String, required: false}
  }],
  totalPrice: {type:Number, required:true}
});
orderSchema.plugin(timestamps);


module.exports = mongoose.model('Order', orderSchema);
