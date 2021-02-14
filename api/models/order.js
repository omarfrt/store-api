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
  productimgl:{type: String, required: false},
  publisher:{type: String, required: false},
  productdimensions:{type: String, required: false},
  language:{type: String, required: false}
  }],
  user: {_id:{type:String,require:false},
    firstname: { type: String, required: true },
              lastname:{type: String, required: true},
              email:{type: String, required: true},
              phone:{type: String, required: false},
              address:{type: String, required: false},
              cin:{type: String, required: false}},
  paypalinfo:{create_time: {type: String, required: false},
              id:{type: String, required: false},
              payer:[ {name:{given_name:{type: String, required: false},
              surname:{type: String, required: false}},
                email_address:{type: String, required: false},
                }],
              purchase_units:[{amount:{currency_code:{type: String, required: false},
                              value:{type: String, required: false}}}]},
  totalPrice: {type:Number, required:true},
  paymentmethod:{type:String, required:false},
  confirmed:{type:Boolean , required : false}
});
orderSchema.plugin(timestamps);


module.exports = mongoose.model('Order', orderSchema);
