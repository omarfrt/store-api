const express = require("express");
const router = express.Router();
const fs = require("fs");
const AWS = require("aws-sdk");
const bucketName = "mexiquebookstoreimages";
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const s3 = new AWS.S3({
  region: "eu-west-3",
  accessKeyId: "AKIA43Q46XZFGTINTUQQ",
  secretAccessKey: "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",
});
//  for (var i = 0; i < file.length; i++) {
//     const fileStream = fs.createReadStream(file[i].path);
//     const uploadParams = {
//       Bucket: bucketName,
//       Body: fileStream,
//       Key: file[i].filename,
//     };

//     s3.upload(uploadParams).promise();
//     //await unlinkFile(file[i].path);
//     return console.log(`image ${file[i]} has been uploaded`);
//uploadfunc
const uploadToS3 = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  console.log("yoo this is s3");
  return s3.upload(uploadParams).promise();
};
exports.uploadToS3 = uploadToS3;
//downloadfunc

const getImageS3 = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
};
exports.getImageS3 = getImageS3;
