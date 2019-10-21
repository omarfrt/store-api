# docs and comments for [_admin.js](_admin.js)

here you'll find examples of requests and responses you'll get out of [_admin.js](_admin.js) route


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
          url:'http://localhost:3000/orders/',
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
