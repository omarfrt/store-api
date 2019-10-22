const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const rimraf = require('rimraf');
// const imagemin = require('imagemin');
// const imageminJpegtran = require('imagemin-jpegtran');
// const imageminPngquant = require('imagemin-pngquant');
//const fs = require('fs');
//const sharp = require('sharp');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null, './uploads/');
    },
    filename :function(req, file, cb){
      cb(null,  file.originalname);
    }
});
const upload = multer({storage: storage});
//uploads folder inst acessible so we need to turn it into a static folder in app.js
const Product = require('../models/products');





///////////////////////////////////////////// search pagenation/////////////////////////////////////////////
router.get('/search/:bookname/:page',(req, res, next)=>{


  const resPerPage =12;
  const page = req.params.page || 1;
console.log(page);
  var regex = new RegExp(req.params.bookname, 'i');
  Product.find({$or:[{bookname: regex},{authorname: regex},{genre:regex}]})
   .sort({'createdAt':-1})
   .skip((resPerPage * page) - resPerPage)
  .limit(resPerPage)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };

    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});








////////////////////////////////////////////////////////////////////////////////////////
router.get('/search/:bookname',(req, res, next)=>{

  var regex = new RegExp(req.params.bookname, 'i');
  Product.find({$or:[{bookname: regex},{authorname: regex},{genre:regex}]})
   .sort({'createdAt':-1})
  .limit(10)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delte this
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

///////////////GET 5 sales //////////////

router.get('/sales',(req, res, next)=>{
  Product.find({sale:true})
   .sort({ 'createdAt':-1})
  .limit(5)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

////////////////////////////genre//////////////////////
router.get('/genre/:genre',(req,res,next)=>{
  var regex = new RegExp(req.params.bookname, 'i');
  Product.find({genre:regex})
  .sort({'createdAt':-1})
  .limit(10)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,//delete this
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

////////////////////// genre witch pages/////////////
router.get('/genre/:genre/:page',(req,res,next)=>{
  var regex = new RegExp(req.params.bookname, 'i');
  const resPerPage =10;
  const page = req.params.page || 1;
  Product.find({genre:regex})
  .sort({'createdAt':-1})
  .limit(resPerPage)
  .skip((resPerPage * page) - resPerPage)
  .select('_id bookname aboutname authorname isbn genre quantity price rating productimgl sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };
    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});





///////////////hero find latest 7//////////////////////
router.get('/hero',(req, res, next)=>{
  Product.find()
   .sort({ 'createdAt':-1})
  .limit(7)
  .select('_id bookname aboutbook authorname isbn genre quantity price rating productimgl sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };

    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});
/////////////////////brows 12 products a page////////////////////////////
router.get('/brows/:page',(req, res, next)=>{
  const resPerPage =12;
  const page = req.params.page || 1;
  Product.find()
  .sort({'createdAt':-1})
  .skip((resPerPage * page) - resPerPage)
  .limit(resPerPage)
  .select('_id bookname aboutbook authorname isbn genre quantity price rating productimgl sale')
  .populate('Product')
  .exec()
  .then(docs =>{
  const response={
   count:docs.length,
    products: docs.map(doc=>{
      return{
        _id: doc._id,
        bookname:doc.bookname,
        sale:doc.sale,
        aboutbook: doc.aboutbook,
        authorname: doc.authorname,
        isbn: doc.isbn,
        genre: doc.genre,
        sale: doc.sale,
        available: doc.available,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productimgl: doc.productimgl,
        request:{
          
          type:'GET',
          url:'http://localhost:3000/products/' +doc._id
        }
      }
    })
  };

    res.status(200).json(response);
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});





router.get('/view/:productId', (req, res, next)=>{
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc =>{
    console.log("from database",doc);
    if(doc){
      res.status(200).json(doc);
    }else{
      res.status(404).json({
        message: 'No valid entry found for provided ID'
      });
    }

  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error:err});

  });
});

module.exports = router;
