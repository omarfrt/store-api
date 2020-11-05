///////////////////////////////////////////THIS IS FOR A NORMAL CLIENT /////////////////////////////////////
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const checkAuth = require('../middleware/buyer_auth');
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
                email: user[0].email,
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
              firstname: user[0].firstname,
              lastname:user[0].lastname
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
  
  
  module.exports = router;