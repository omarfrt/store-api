///////////////////////////////////////////THIS IS FOR A NORMAL CLIENT /////////////////////////////////////
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const checkAuth = require('../middleware/buyer_auth');
const user = require('../models/user');
const pwdjwt= '3ezi3endo2dh';



router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email: req.body.email,
                password: hash,
                firstlogin:"true"
              });
              user
                .save()
                .then(result => {
                  
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                 console.log(err);
                 
                  res.status(500).json({
                    error: err
                    
                  });
                });
            }
          });
        }
      });
  });
  
  router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                userId: user[0]._id
              },
               pwdjwt,
              {
                  expiresIn: "24h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token,
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
       
        res.status(500).json({
          error: err
        });
      });
  });
  
  router.get('/info',checkAuth,(req,res,next)=>{
    
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token,pwdjwt);
    User.find({_id:decoded.userId})
    .then(user=>{
       
      return res.status(200).json({firstname: user[0].firstname,
        email: user[0].email,
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

///////////////////////////////////////
// cart

async function getcart(userId,res){
await User.find({_id:userId})
.populate("cart")
.then(user=>{
   
  return res.status(200).json({cart: user[0].cart});

 })
.catch(
   err=>{
      console.log(err);
      res.status(500).json({
        error:err
      });
    }
);
};

 router.get('/cart',checkAuth,(req,res,next)=>{
    
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token,pwdjwt);
  User.find({_id:decoded.userId})
  .populate("cart")
  .then(user=>{
     
    return res.status(200).json({cart: user[0].cart});
 
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
 

 router.patch('/deleteFromCart',checkAuth,(req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token,pwdjwt);
   User.updateOne({_id:decoded.userId},{$pullAll:{cart: req.body._id}})
   .exec()
  .then(result=>{
     getcart(decoded.userId,res);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
 });


 router.patch('/addToCart',checkAuth, (req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token,pwdjwt);
  User.updateOne({_id:decoded.userId},{$addToSet:{cart:req.body._id}})
  .exec()
  .then(result=>{
    getcart(decoded.userId,res);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
 
 });

 ///////////////////////////////////////////////////
 // wishList
  async function getWishList(userId,res){
  await User.find({_id:userId})
  .populate("wishList")
  .then(user=>{
     
    return res.status(200).json({wishList: user[0].wishList});
  
   })
  .catch(
     err=>{
        console.log(err);
        res.status(500).json({
          error:err
        });
      }
  );
  }
 router.get('/wishlist',checkAuth,(req,res,next)=>{
    
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token,pwdjwt);
  User.find({_id:decoded.userId})
  .populate("wishList")
  .then(user=>{
     
    return res.status(200).json({wishList: user[0].wishList});
 
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

router.patch('/deleteFromWishList',checkAuth,(req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token,pwdjwt);
   User.updateOne({_id:decoded.userId},{$pullAll:{wishList: req.body._id}})
   .exec()
  .then(result=>{
    getWishList(decoded.userId,res);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
 });

  
 router.patch('/addToWishList',checkAuth, (req,res,next)=>{
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token,pwdjwt);
  User.updateOne({_id:decoded.userId},{$addToSet:{wishList:req.body._id}})
  .exec()
  .then(result=>{
    getWishList(decoded.userId,res);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
 
 });
  module.exports = router;