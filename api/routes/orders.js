const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require ('../models/products');
//handle requests get delete .....
router.get('/',(req, res, next)=>{
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
