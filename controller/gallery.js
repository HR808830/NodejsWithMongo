const mongoose = require('mongoose');
let collection = mongoose.model('gallery');
const { responseModel } = require('../model');
const { query } = require('../query');

async function add(req) {
  try {
    let add = await query.insert(collection,{
      title: req.body.title ||'Ganesha',
      image:req.body.image
    });
    return responseModel.successResponse("create gallery ", add);
  } catch (err) {
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("gallery not create", {}, errMessage);
  }
}

async function getAllGallery(req) {
  try {
    let allGallery = await query.find(collection,{});
    return responseModel.successResponse("get allgallery ", allGallery);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("gallery not get", {}, errMessage);
  }
}
async function deleteGallery(req) {
  try {
    let deletegallery = await query.deleteMany(collection,{_id:req.params.galleryId});
    return responseModel.successResponse("gallery delete ", deletegallery);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("gallery not delete", {}, errMessage);
  }
}
module.exports = {
  add,
  getAllGallery,
  deleteGallery
}