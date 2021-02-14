const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const pwdjwt= '3ezi3endo2dh'
const Order = require('../models/order');
const Product = require ('../models/products');
const checkAuth = require('../middleware/buyer_auth');
const User = require('../models/user');

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


//................................................................................\\

firstloginfosave=(order)=>{
  const {user,totalPrice, products, paymentmethod}=order
  const {firstname,lastname} = user;
User.find({email:order.user.email})
.exec()
.then(docs =>{
  if(docs.firstlogin = "true"){
    User.updateOne({email:order.user.email},{$set:{firstname:order.user.firstname,
      lastname:order.user.lastname,
      phone:order.user.phone,
      address:order.user.address,
      cin:order.user.cin,
    firstlogin:"false"} 
       }).exec().then().catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
  }
})
.catch(err=>{
  console.log(err);
  res.status(500).json({
    error:err
  });
});
};

//................................................................................\\
async function getTotal(req,usrId ) {
  //get total price from ids
    const ids = req.body.ids;
  const addr = req.body.address;
  const cin = req.body.cin;
  const phone = req.body.phone;

  const products = await  Product.find().where('_id').in(ids).exec();
  const user = await User.findById(usrId).exec();


  const tot = await products.reduce((acc,product)=>{
  acc += product.price ;
  return acc;
  },0);
  
  function total(tot) {
  if (tot < 160) {
    return tot+45;
  }
  if (tot < 800) {
    return tot+30;
  }
  return tot;
  }
  const usr = { ...user.toObject(), address: addr, cin: cin, phone: phone };
  //console.log(usr);
  const order= new Order({
  _id: new mongoose.Types.ObjectId,
  products:products,
  user:usr,
  totalPrice: total(tot)
  });
  return order;
}

router.post('/',checkAuth,async (req, res, next) => {
//get books ids  
  
 const token = req.headers.authorization.split(" ")[1];
 const decoded = jwt.verify(token,pwdjwt);
  const usrId = decoded.userId;

  
  
  const order = await getTotal(req, usrId);
 
 order.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
          message:'order stored',
          createdOrder:{
            _id: result._id,
            product: result.products,
            costumer:result.user,
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
    //sendreceipt(order);
    firstloginfosave(order);
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
