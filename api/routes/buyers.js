const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const multer = require('multer');
const rimraf = require('rimraf');

const Order = require('../models/order');
const Buyer = require ('../models/buyer');
const checkAuth = require('../middleware/buyer_auth');
const User = require('../models/user');
const Product = require ('../models/products');


router.post('/info',checkAuth,(req,res,next)=>{
   User.find({email:req.body.email})
   .then(user=>{
      
     return res.status(200).json({firstname: user[0].firstname,
        lastname:user[0].lastname,
        phone:user[0].phone,
        address:user[0].address,
        cin:user[0].cin});
  
    })
   .catch(
      err=>{
         console.log(err);
         res.status(500).json({
           error:err
         });
       }
   );
});








 router.post('/orders/page/:page', checkAuth, (req, res, next)=>{
   // in check auth it get sent in the headers with "bearer" in the begining
    // sendreceipt();
     
    const resPerPage =20;
    const page = req.params.page || 1;
     Order.find({email: req.body.email})
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
 
   router.patch('/comments',checkAuth,(req,res,next)=>{
    
    const bkrate =req.body.rating;
    const usrate= req.body.comments[0].userRating;
    var difrence= bkrate - usrate;

    if(difrence===0){
      var bookrate = bkrate;
    }else {
      console.log(difrence);
      
      var bookrate = bkrate-difrence/2;
    }

    const id= req.body._id;
    Product.updateOne({_id:id},{$push:{comments:req.body.comments},$set:{rating:bookrate}})
    .exec()
    .then(result=>{
      res.status(200).json({
        message:'comment saved',
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

module.exports = router;