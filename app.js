const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require("passport")



const checkAuth = require('./api/middleware/check-auth');
const adminRoutes = require('./api/routes/_admin');
const usersRoutes = require('./api/routes/user');
const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const productexRoutes = require('./api/routes/excelProduct');
const uploadimgsRoutes = require('./api/routes/imagesUpload');
const buyerRoutes = require('./api/routes/buyers');
const buyerloginRoutes = require('./api/routes/buyerlogin');
//const googleauth = require('./api/routes/googleAuth0');

const pwddb = 'qwert12345A';
mongoose.connect('mongodb+srv://jlo:' + pwddb + '@node-rest-shop-ijnnd.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});


app.use(morgan('dev'));
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//cors handelling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origins,X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(passport.initialize());
// routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
//app.use('/user', usersRoutes);
app.use('/buyer',buyerRoutes);
app.use('/user', buyerloginRoutes);
app.use('/admin',checkAuth,adminRoutes);
app.use('/excelProduct',checkAuth, productexRoutes);
app.use('/imagesUpload', checkAuth, uploadimgsRoutes);
//app.use('/google', googleauth);


//handling errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
