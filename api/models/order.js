const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [{  _id:{type: String, required: true},
              bookName:{type: String, required: true},
              authorName:{type: String, required: true},
              isbn:{type: String, required: true},
              orderQte:{type:Number,required:true},
              price: {type:Number , required:true}}],
  totalPrice: {type:Number, required:true}
});
orderSchema.plugin(timestamps);


module.exports = mongoose.model('Order', orderSchema);
