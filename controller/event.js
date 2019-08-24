const mongoose = require('mongoose');
let collection = mongoose.model('event');
const { responseModel } = require('../model');
const { query,eventQuery } = require('../query');

async function add(req) {
  try {
    let event = await query.insert(collection,{
      title: req.body.title,
      image:req.body.image,
      eventDate:req.body.date,
      description: req.body.description
    });
    return responseModel.successResponse("create event ", event);
  } catch (err) {
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("event not create", {}, errMessage);
  }
}

async function getAllEvent(req) {
  try {
    let allEvent = await query.find(collection,{});
    return responseModel.successResponse("get allEvent ", allEvent);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("allEvent not get", {}, errMessage);
  }
}
async function getEventById(req) {
  try {
    let event = await eventQuery.findOne({_id:req.params.eventId});
    return responseModel.successResponse("get event ", event);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("event not get", {}, errMessage);
  }
}
async function editEvent(req) {
  try {

    let event =  await query.updateOne(collection,{
      _id:req.body._id 
    },{
      title: req.body.title,
      eventDate:req.body.date,
      description: req.body.description
    });
    return responseModel.successResponse("get event ", event);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("event not get", {}, errMessage);
  }
}
async function deleteEvent(req) {
  try {
    let deletegallery = await query.deleteMany(collection,{_id:req.params.eventId});
    return responseModel.successResponse("event delete ", deletegallery);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("event not delete", {}, errMessage);
  }
}
module.exports = {
  add,
  getAllEvent,
  getEventById,
  editEvent,
  deleteEvent
}