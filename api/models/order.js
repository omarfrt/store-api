const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [{  _id:{type: String, required: true},
    bookname: {type: String, required: true},
    hot:{type:Boolean , required : true},
    aboutbook: {type: String, required: true},
    authorname: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: {type: String, required: true},
   // quantity:Number,
    price: Number,
    rating:Number,
    productimgl:{type: String, required: true},
    productimgs:{type: String, required: true}
  }],
  totalPrice: {type:Number, required:true}
});
orderSchema.plugin(timestamps);


module.exports = mongoose.model('Order', orderSchema);
