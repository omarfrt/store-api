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


router.post('/info',checkAuth,(req,res,next)=>{
   User.find({email:req.body.email})
   .then(docs=>{
      const response = {
        count:docs.length,
        orders: docs.map(doc=>{
          return{
            firstname : doc.firstname,
            lastname: doc.lastname,
            email: doc.email,
            phone: doc.phone,
            address: doc.address,
            cin: doc.cin
          }
        })
      };
      res.status(200).json(response);
  
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
 

module.exports = router;