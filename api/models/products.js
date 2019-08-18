const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  bookname: {type: String, required: false},
  hot:{type:Boolean , required : false},
  aboutbook: {type: String, required: false},
  authorname: {type: String, required: false},
  isbn: {type: String, required: false},
  genre: {type: String, required: false},
  quantity:Number,
  price: Number,
  rating:Number,
  productimgl:{type: String, required: false},
  productimgs:{type: String, required: false}
});

 productSchema.plugin(timestamps);

module.exports = mongoose.model('Product', productSchema);
