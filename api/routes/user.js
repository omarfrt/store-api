/////////////////////// THIS IS FOR THE ADMIN!!!!///////////
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const pwdjwt= 'secret'

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
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
               
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                
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
            token: token
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




router.delete("/:userId",checkAuth, (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      
      res.status(500).json({
        error: err
      });
    });
});



module.exports = router;







// const express = require('express')
// const app = express();
// const router = express.Router();
// const mongoose = require('mongoose');
// const passport = require("passport")
// const GoogleStrategy = require('passport-google-oauth20').Strategy;


// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// passport.use(new GoogleStrategy({
//     clientID: '636353299712-7cbr13nj8jf2f1ats01sehagemp58l7q.apps.googleusercontent.com',
//     clientSecret: 'Klpb1p2kvhxIbGn9U8IXROAY',
//     callbackURL: "http://localhost:2000/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     return cb(null, profile);
//   }
// ));


// router.get('/logedin',(req, res) => res.send(`Welcome mr ${req.user.displayName}!`));


// router.get('/',
//   passport.authenticate('google', { scope: ['profile','email'] }));


// router.get('/callback', 
//   passport.authenticate('google', { failureRedirect: '/' }),
//   function (req, res) {
//     res.send(req.user._json.email)
//     // Successful authentication, redirect home.
//     // res.redirect('/google/logedin');
//   });
// module.exports = router;
