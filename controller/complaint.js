const mongoose = require('mongoose');
let collection = mongoose.model('complaint');
const { responseModel } = require('../model');
const { query } = require('../query');

async function add(req) {
  try {
    let add = await query.insert(collection,{
      title: req.body.title,
      description:req.body.description,
      userId:req.authenticationUser.authId || null
    });
    return responseModel.successResponse("create complaint ", add);
  } catch (err) {
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("complaint not create", {}, errMessage);
  }
}

async function getAllComplaint(req) {
  try {
    let allComplaint = await query.find(collection);
    return responseModel.successResponse("get allcomplaint ", allComplaint);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("complaint not get", {}, errMessage);
  }
}
async function deleteComplaint(req) {
  try {
    let deletecomplaint = await query.deleteMany(collection,{_id:req.params.complaintId});
    return responseModel.successResponse("complaint delete ", deletecomplaint);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("complaint not delete", {}, errMessage);
  }
}
module.exports = {
  add,
  getAllComplaint,
  deleteComplaint
}