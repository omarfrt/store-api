const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bookname: {type: String, required: true},
  aboutbook: {type: String, required: true},
  authorname: {type: String, required: true},
  isbn: {type: String, required: true},
  type: {type: String, required: false},
  genre: {type: String, required: true},
  sale: {type: Boolean, required: false},
  available: {type: Boolean, required: false},
  quantity:{type: Number, required: false},
  price: Number,
  rating:Number,
  productimgl:{type: String, required: true},
  publisher:{type: String, required: true},
  productdimensions:{type: String, required: true},
  language:{type: String, required: true},
  comments:{
    firstname:{type: String, required: false},
    lastname:{type: String, required: false},
    comment:{type: String, required: false}
  }
});

 productSchema.plugin(timestamps);

module.exports = mongoose.model('Product', productSchema);
