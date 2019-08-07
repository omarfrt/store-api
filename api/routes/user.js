const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {

  const user = new User({

    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: bcrypt.hash(req.body.email, 10, (err, hash) => {
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
        user.save()
          .then(result => {
            console.log(result);
            res.status(500).json({
              message: "user has been created!"
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });

      }
    })
  });



});






module.exports = router;
