const express = require("express");
const router = express.Router();
const multer = require("multer");
const rimraf = require("rimraf");
const sharp = require("sharp");
const fs = require("fs");
const { uploadToS3 } = require("./BucketUp");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const checkAuth = require("../middleware/check-auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/imgL/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage }).array("imgupload");
//const upload = multer({ storage: storage }).single("imgupload");
//
// async function MinifyImages(){
// 	 const largeImages = await  imagemin(['./imguploads/*.{jpg,png}'], './images/imgL', {
// 		plugins: [
// 			imageminJpegtran(),
// 			imageminPngquant({
// 				quality: [0.6, 0.8]
// 			})
// 		]
// 	});
//   const smallImages =await imagemin(['./imguploads/*.{jpg,png}'], './images/imgS', {
//    plugins: [
//      imageminJpegtran(),
//      imageminPngquant({
//        quality: [0.1, 0.2]
//      })
//    ]
//  });
//  largeImages.map((item)=>console.log(item.path));
//  await rimraf('./imguploads/*', function () { console.log('done'); });
//
//
// };

// async function MinifyImages(){
//   const largeImages = await sharp('./imguploads/')// it needs image path folder doesntwork
//     .resize(300, 200)
//     .toFile('./images/imgS/l.jpg', function(err) { // same here it needs the fullpath with new image name to be saved
//       if(!err){
//         console.log("everything is working nigga");
//       } else{
//         console.log(err);
//       }
//       // output.jpg is a 300 pixels wide and 200 pixels high image
//       // containing a scaled and cropped version of input.jpg
//     });
// };

//   fs.readdir("./imguploads", function(err, items) {
//     console.log(items);
//
//     for (var i=0; i<items.length; i++) {
//       sharp('./imguploads/'+ items[i])// it needs image path folder doesntwork
//         .resize(300, 200)
//         .toFile('./images/imgS/'+ items[i], function(err) { // same here it needs the fullpath with new image name to be saved
//           if(!err){
//             console.log("everything is working for small imgs");
//           } else{
//             console.log(err);
//           }
//           // output.jpg is a 300 pixels wide and 200 pixels high image
//           // containing a scaled and cropped version of input.jpg
//         });
//         console.log(items[i]);
//     }
//
//     //larg imgS
//
//     for (var i=0; i<items.length; i++) {
//       sharp('./imguploads/'+ items[i])// it needs image path folder doesntwork
//         .resize(300, 200)
//         .toFile('./images/imgL/'+ items[i], function(err) { // same here it needs the fullpath with new image name to be saved
//           if(!err){
//             console.log("everything is working for Larg imgs");
//           } else{
//             console.log(err);
//           }
//           // output.jpg is a 300 pixels wide and 200 pixels high image
//           // containing a scaled and cropped version of input.jpg
//         });
//         console.log(items[i]);
//     }
//
//     // deleting all original largeImages
//     rimraf('./imguploads/*', function () { console.log('original images been deleted'); });
// });

// app.post('/profile', function (req, res) {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // A Multer error occurred when uploading.
//     } else if (err) {
//       // An unknown error occurred when uploading.
//     }

//     // Everything went fine.
//   })
// })
async function uploading(file) {
  console.log(`should run ${file.length} times`);
  for (var i = 0; i < file.length; i++) {
    console.log(file[i].path);
    const result = await uploadToS3(file[i]);
    await unlinkFile(file[i].path);
    console.log(result);

    //res.write({ imagePath: `/images/${result.Key}` });
  }
  console.log("ending loop");
  // res.write("uploadToS func");
}

router.post("/", upload, checkAuth, async (req, res, next) => {
  const file = req.files;
  await uploading(file);
  res.send("images has been uploaded successfully //this not an err handler!!");
  res.end();
});

module.exports = router;
