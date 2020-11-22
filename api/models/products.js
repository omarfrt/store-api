const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bookname: {type: String, required: false},
  aboutbook: {type: String, required: false},
  authorname: {type: String, required: false},
  isbn: {type: String, required: false},
  type: {type: String, required: false},
  genre: {type: String, required: false},
  sale: {type: Boolean, required: false},
  available: {type: Boolean, required: false},
  quantity:{type: Number, required: false},
  price: Number,
  rating:Number,
  oldprice:{type: Number, required: false},
  productimgl:{type: String, required: false},
  publisher:{type: String, required: false},
  productdimensions:{type: String, required: false},
  language:{type: String, required: false},
  comments:[{
    firstname:{type: String, required: false},
    lastname:{type: String, required: false},
    userRating:{type: String , required: false},
    comment:{type: String, required: false}
  }]
});

 productSchema.plugin(timestamps);

module.exports = mongoose.model('Product', productSchema);
