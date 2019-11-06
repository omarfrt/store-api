const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  products: [{  _id:{type: String, required: true},
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
  }],
  user:     { firstname:{type: String, required: true},
              lastname:{type: String, required: true},
              email:{type: String, required: true},
              phone:{type: String, required: true},
              address:{type: String, required: true},
              cin:{type: String, required: true}},
  paypalinfo:{create_time: {type: String, required: false},
              id:{type: String, required: false},
              payer:[ {name:{type: String, required: false},
                email_address:{type: String, required: false},
                payer_id:{type: String, required: false},
                phone:{type: String, required: false},
                birth_date:{type: String, required: false},
                address:{type: String, required: false},}]},
  totalPrice: {type:Number, required:true},
  paymentmethod:{type:String, required:true},
  confirmed:{type:Boolean , required : false}
});
orderSchema.plugin(timestamps);


module.exports = mongoose.model('Order', orderSchema);
