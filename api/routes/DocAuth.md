# docs and comments for [user.js](user.js)

here you'll find examples of requests and responses you'll get out of [user.js](user.js) route


# Products Model
the database model can be found in [user.js](https://github.com/omarfrt/store-api/blob/master/api/models/user.js)

```

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true }
});

userSchema.plugin(timestamps);
```

## POST Login

### Request

```
Post http://localhost:3000/user/
```

  with body 

```
 email:
 password:
```
### Response

  Responds with json
  
  ```
    {
    "message": "Auth successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RpbmdhZG1pbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI1ZGFkYjczNTE5OTY0OTE3YjRhYTZjNGEiLCJpYXQiOjE1NzE2NjU3MzEsImV4cCI6MTU3MTY2OTMzMX0.HgmWrr-B2NDmV9eCzbyrZNTwqHdGmtPHtkCgwnhqTCs"
    }
  ```
  with status 201
  
### Error Response

  Responds with json
  
  ```
  error:err
  ```
  with status 500
  
# checkAuth
send the token Authorization header with value of: baerer token

