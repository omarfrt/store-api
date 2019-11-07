const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const multer = require('multer');
const rimraf = require('rimraf');

const Order = require('../models/order');
const Product = require ('../models/products');
const checkAuth = require('../middleware/check-auth');


////////////////////////////////////////admin order requests//////////////////////
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
router.get('/orders/page/:page', checkAuth, (req, res, next)=>{
    // in check auth it get sent in the headers with "bearer" in the begining
     // sendreceipt();
      
     const resPerPage =20;
     const page = req.params.page || 1;
      Order.find()
      .sort({'createdAt':-1})
      .skip((resPerPage * page) - resPerPage)
      .limit(resPerPage)
      .exec()
      .then(docs=>{
        const response = {
          count:docs.length,
          orders: docs.map(doc=>{
            return{
              _id: doc._id,
              product: doc.products,
              user: doc.user,
              paypalinfo: doc.paypalinfo,
              paymentmethod: doc.paymentmethod,
              totalPrice:doc.totalPrice,
              confirmed:doc.confirmed,
              updatedAt:doc.updatedAt,
              createdAt:doc.createdAt,
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
    


    
router.get('/orders/:orderId',checkAuth,(req, res, next)=>{
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


router.delete('/orders/:orderId',checkAuth,(req, res, next)=>{
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

router.patch("/orders/:orderId",checkAuth,(req, res, next)=>{
    const id= req.params.orderId;
    console.log(id);
    
    Order.update({_id:id},{$set:{confirmed:true}})
    .exec()
    .then(result=>{
      res.status(200).json({
        message:'order confirmed',
        request:{
          type:'GET',
          url:'http://localhost:2000/orders/'+ id
        }
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
    
    
    
    sendreceipt();
  
  
  
   Order.findById(id)
  .exec()
  .then(order =>{
    const productids = order.products.map(ids=>ids._id);
    Product.updateMany({_id:productids},{$inc:{quantity:-1}})
    .exec()
    .then()
    .catch();
    res.status(200).json({
      order: productids,
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

  ////////////////////////////////////////////// admin Product requets//////////////////////////////////////
        
const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null, './images/imgL/');
    },
    filename :function(req, file, cb){
      cb(null,  file.originalname);
    }
});
const upload = multer({storage: storage});

router.post('/products',upload.single('productimg'),checkAuth ,(req, res, next)=>{
    const product = new Product({
  
      _id: new mongoose.Types.ObjectId(),
      bookname:req.body.bookname,
      aboutbook: req.body.aboutbook,
      authorname: req.body.authorname,
      isbn: req.body.isbn,
      genre: req.body.genre,
      quantity: req.body.quantity,
      price:req.body.price,
      rating: req.body.rating,
      productimgl: req.file.filename
    });
    //saving the product
    product
    .save()
    .then(result=>{
      console.log(result);
      res.status(201).json({
        message:'Created product',
        createdprudct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      })
    });
  
  });
  
  
  router.delete("/products/:productId",checkAuth, (req, res, next)=>{

    const id= req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result =>{
      res.status(200).json({
        message:'product deleted',
        request:{
          type:'POST',
          url:'http://localhost:3000/products/',
          body:{
            bookname: {type: String, required: true},
            aboutbook: {type: String, required: true},
            authorname: {type: String, required: true},
            isbn: {type: String, required: true},
            genre: {type: String, required: true},
            quantity:Number,
            price: Number,
            rating:Number,
            productimgl:{type:String, required:true},
          }
        }
      });
  
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    });
  });


  router.patch("/products/:productId",checkAuth,(req, res, next)=>{
    const id= req.params.productId;
    Product.updateOne({_id:id},{$set:req.body})
    .exec()
    .then(result=>{
      res.status(200).json({
        message:'Product updated',
        request:{
          type:'GET',
          url:'http://localhost:3000/products/'+ id
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
  
  router.patch("/products/sale/:productId",checkAuth,(req, res, next)=>{
    const id= req.params.productId;
    console.log(id);
    
    Product.update({_id:id},{$set:{sale:true}})
    .exec()
    .then(result=>{
      res.status(200).json({
        message:'product updated',
        request:{
          type:'GET',
          url:'/products/sale/'+ id
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


  module.exports= router;