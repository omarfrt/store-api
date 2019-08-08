const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const Order = require('../models/order');
const Product = require ('../models/products');
const checkAuth = require('../middleware/check-auth');



async function sendreceipt(){

  let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <jlo-16643a@inbox.mailtrap.io>', // sender address
    to: "omarfertat96@gmail.com, jlo-16643a@inbox.mailtrap.io", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world? mailing khedam f api aller public dyal tanger weeeeeeee. had mail tsayfet mn store-api message if you get this. jlo with love and effection <3 </b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}





//handle requests get delete .....
router.get('/', checkAuth ,(req, res, next)=>{
// in check auth it get sent in the headers with "bearer" in the begining
  sendreceipt();

  Order.find()
  // .populate('Product')
  .exec()
  .then(docs=>{
    const response = {
      count:docs.length,
      orders: docs.map(doc=>{
        return{
          _id: doc._id,
          product: doc.product,
          totalPrice:doc.totalPrice,

          request:{
            type :'GET',
            url:'http://localhost:3000/orders/'+ doc._id
          }
        }
      })
    };
    res.status(200).json(response);

  })
  .catch(err=>{
    res.status(500).json({
      error:err
    });
  });
});



router.post('/',(req, res, next)=>{
const total = req.body.products.reduce((acc,product)=>{
  acc += product.orderQte * product.price;
  return acc;
},0)

  sendreceipt();

const order= new Order({
  _id: new mongoose.Types.ObjectId,
  products:req.body.products,
  totalPrice: total
});
 order.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
          message:'order stored',
          createdOrder:{
            _id: result._id,
            product : result.product,
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







});


router.get('/:orderId',(req, res, next)=>{
    Order.findById(req.params.orderId)
    .populate('pruduct')
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

router.delete('/:orderId',(req, res, next)=>{
    Order.remove({
      _id: req.params.orderId
    })
    .exec()
    .then(result =>{
      res.status(200).json({
      message:'order been deleted',
        request:{
          type:'POSt',
          url:'http://localhost:3000/orders/',
          body:{productId:'ID', quantity:'Number'}
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
