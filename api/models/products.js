const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bookName: {type: String, required: false},
  aboutBook: {type: String, required: false},
  authorName: {type: String, required: false},
  isbn: {type: String, required: false},
  genre: {type: String, required: false},
  quantity:Number,
  price: Number,
  rating:Number,
  productImgL:{type: String, required: false},
  productImgS:{type: String, required: false}
});

 productSchema.plugin(timestamps);

module.exports = mongoose.model('Product', productSchema);
