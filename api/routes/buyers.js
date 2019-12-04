const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const multer = require('multer');
const rimraf = require('rimraf');

const Order = require('../models/order');
const Buyer = require ('../models/buyer');
const checkAuth = require('../middleware/buyer_auth');


router.get('/info',checkAuth,(req,res,next)=>{
   Buyer.find({email:req.body.email})
   .then(docs=>{
      const response = {
        count:docs.length,
        orders: docs.map(doc=>{
          return{
            _id: doc._id,
            firstname : doc.firstname,
            lastname: doc.lastname,
            email: doc.emit,
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





router.post('/info',checkAuth,(req,res,next)=>{
 const buyer = new Buyer({
    _id:  new mongoose.Types.ObjectId(),
    firstname:req.body.firstname,
    lastname: req.body.lastname,
    email:req.body.email,
    phone:req.body.phone,
    address:req.body.address,
    cin:req.body.cin
 });

buyer.save()
.then(result => {
   res.status(201).json({
       message:'buyer info saved',
       buyer_info:{
         _id: result._id,
         firstname : result.firstname,
         lastname: result.lastname,
         email: result.email,
         phone: result.phone,
         address: result.address,
         cin: result.cin
       },
       request:{
         type:'get',
         url:  'http://localhost:3000/buyers/'+ result._id
       }
   });

 })
 .catch(err=>{
   console.log(err);
   res.status(500).json({
     error:err
   });
 });



 router.post('/orders/page/:page', checkAuth, (req, res, next)=>{
   // in check auth it get sent in the headers with "bearer" in the begining
    // sendreceipt();
     
    const resPerPage =20;
    const page = req.params.page || 1;
     Order.find({firstname: req.body.firstname})
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
 
});
module.exports = router;