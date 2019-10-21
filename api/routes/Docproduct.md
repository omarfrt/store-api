# docs and comments for [products.js](product.js)

here you'll find examples of requests and responses you'll get out of [products.js](product.js) route


# Products Model
the database model can be found in [products.js](https://github.com/omarfrt/store-api/blob/master/api/models/products.js)

```
_id: mongoose.Schema.Types.ObjectId,
bookname: {type: String, required: false},
  aboutBook: {type: String, required: false},
  authorName: {type: String, required: false},
  isbn: {type: String, required: false},
  genre: {type: String, required: false},
  quantity:Number,
  price: Number,
  rating:Number,
  productImgL:{type: String, required: false},
  productImgS:{type: String, required: false}
```


## GET 
### Request 

```
get http://localhost:2000/products/
```
### Response

```
        _id: doc._id,
      bookname:docbookname,
        about: doc.aboutBook,
        author: doc.authorName,
        isbn: doc.isbn,
        genre: doc.genre,
        quantity: doc.quantity,
        price:doc.price,
        rating: doc.rating,
        productImgL: doc.productImgL,
        productImgS: doc.productImgS,
        request:{
          //hna kay3tik link w methode li tdir bach tjbed
          //gha wa7d lbook , 2000000IQ shit
          type:'GET',
          url:'http://localhost:2000/products/' +doc._id
```
  with a status of 200
 
 ### Error Response
 
returns a jason 

```
error:err
```

  with a status off 500

# GET BYID

getting a spesific product

### Request

```
get http://localhost:2000/products/:productId
```
### Response


```
    _id:
  bookname:
    about:
    author:
    isbn: 
    genre: 
    quantity: 
    price:
    rating: 
    productImgL: 
    productImgS: 
```
  status 200
  
### Error Response

  status 404
  
  ```
  message: 'No valid entry found for provided ID'
  ```
  status 500
  
  ```
  error:err
  ```
  


