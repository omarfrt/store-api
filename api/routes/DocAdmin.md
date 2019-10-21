# docs and comments for [_admin.js](_admin.js)

here you'll find examples of requests and responses you'll get out of [_admin.js](_admin.js) route

# ALL ADMIN ORDER REQUEST
## GET 
### Request 

```
get http://localhost:2000/admin/orders/page/:page
```

### Response
sends latest 20 orders in each page 
```
  _id: doc._id,
          product: doc.products,
          user: doc.user,
          totalPrice:doc.totalPrice,
          confirmed:doc.confirmed,
          updatedAt:doc.updatedAt,
          createdAt:doc.createdAt,
```
note that products is an array of products!

with a status of 200
 
 ### Error Response
 
returns a jason 

```
error:err
```

  with a status off 500


## GET ONE ORDER BY ID

  
```
Get http://localhost:2000/admin/orders/:orderId
```

### Response

```
  _id: doc._id,
          product: doc.products,
          user: doc.user,
          totalPrice:doc.totalPrice,
          confirmed:doc.confirmed,
          updatedAt:doc.updatedAt,
          createdAt:doc.createdAt,
```
note that products is an array of products!

with a status of 200
 
 ### Error Response
 
returns a jason 

```
error:err
```

  with a status off 500
  
  
## DELETE order

 
```
DELETE http://localhost:2000/admin/orders/:orderId
```
### response
```
message:'order been deleted',
        request:{
          type:'POSt',
          url:'http://localhost:2000/admin/orders',
          body:{productId:'ID', quantity:'Number'}
```
## CONFIRM ORDER

### request

```
PATCH http://localhost:2000/admin/orders/:orderId
```
### response
```
this basically sets:
confirm: true,
to the order
and sends email confirming th order(the email needs to be set corectly ) 
```
# ALL ADMIN PRODUCTS REQUESTS

## POST

### Request

```
Post http://localhost:2000/admin/products
```

  with body 

```
  bookname:
    about:
    author:
    isbn: 
    genre: 
    quantity: 
    price:
    rating: 
    productImage: // img here
```
### Response

  Responds with json
  
  ```
      message:'Created product',
      createdprudct: result 
  ```
  with status 201
  
### Error Response

  Responds with json
  
  ```
  error:err
  ```
  with status 500
  
  
  ## DELETE
  
  ### Request
  
  ```
  delete http://localhost:2000/admin/products/:productId
  ```

  ### Response
  
  ```
  message:'product deleted',
      request:{
        type:'POST',
        url:'http://localhost:2000/admin/products/',
        body:{
        bookname: {type: String, required: true},
          aboutBook: {type: String, required: true},
          authorName: {type: String, required: true},
          isbn: {type: String, required: true},
          genre: {type: String, required: true},
          quantity:Number,
          price: Number,
          rating:Number,
          productImgL:{type: String, required: true},
          productImgS:{type: String, required: true}
   ```


  ### Error Response
  
  Status 500
  ```
  error : err
  ```
  
  ## PATCH
  
  ### Request
  
  ```
  patch http://localhost:2000/admin/products/:productId
  ```
    with body 
    
    ```
    //you can patch what you want not full body , exmple justbookname.
      bookname:
        about:
        author:
        isbn: 
        genre: 
        quantity: 
        price:
        rating: 
        productImage:
    ```
    
  ### Respone
    
    Status 200
    
    ```
        message:'Product updated',
        request:{
        type:'GET',
        url:'http://localhost::2000/admin/products/'+ id
    ```
    
  ### Error Response
   
    Status 500
    
    ```
    error : err
    ```
    


