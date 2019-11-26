const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const Order = require('../models/order');
const Product = require ('../models/products');
const checkAuth = require('../middleware/check-auth');

const htmlParser = (order)=>{
  const {user,totalPrice, products, paymentmethod}=order
  const {firstname,lastname} = user;

  return (`
  <h1>Hello ${firstname},</h1>
  <p>
  Your order has been placed with a total of ${totalPrice} Dh, paid by ${paymentmethod};
  <h2>Your Books</h2>
  ${products.map((item)=>(
    `<p>
        ${item.bookname}
    </p>`
  ))}
  </p>
`)
}
async function sendreceipt(order){
 //
 // let testAccount = await nodemailer.createTestAccount();
 // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
    
    secure: false, // true for 465, false for other ports
    auth: {
      user: "iroonix5@gmail.com", // generated ethereal user
      pass: "qwert12345A" // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <jlo-16643a@inbox.mailtrap.io>', // sender address
    to: order.user.email, // list of receivers
    subject: 'MexiqueBookShop || Your Order has been placed.', // Subject line
    html: htmlParser(order) // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}







router.post('/',(req, res, next)=>{
const tot = req.body.products.reduce((acc,product)=>{
  acc += product.price ;
  return acc;
},0);

function total(tot){
  if (tot < 160) {
    return tot+45;
  }
  if (tot < 800) {
    return tot+30;
  }
  return tot;
}
const order= new Order({
  _id: new mongoose.Types.ObjectId,
  products:req.body.products,
  user:req.body.user,
  paypalinfo: req.body.paypalinfo,
  paymentmethod: req.body.paymentmethod,
  totalPrice: total(tot)
});
 order.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
          message:'order stored',
          createdOrder:{
            _id: result._id,
            product : result.product,
            paypalinfo: result.paypalinfo,
            paymentmethod: result.paymentmethod,
            totalPrice: result.totalPrice
          },
          request:{
            type:'get',
            url:  'http://localhost:3000/orders/'+ result._id
          }
      });

    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
    sendreceipt(order);
  });

    
    router.get('/:orderId',(req, res, next)=>{
      
      
      Order.findById(req.params.orderId)
      .populate('order')
      .exec()
      .then(order =>{
        res.status(200).json({
          order: order,
          request:{
            type:'GET',
            url:'http://localhost:3000/orders/'
          }
        });
      })
      .catch(err=>{
        res.status(500).json({
          error: err
        });
      });
  });














module.exports= router;
