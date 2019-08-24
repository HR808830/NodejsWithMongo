const { responseModel } = require('../model');
const {  commonService } = require('../service');
const { query,userQuery } = require('../query');
const mongoose = require('mongoose');
let collection = mongoose.model('user');

async function createUser(data) {
  try {
    let userData ={
      email:data.email,
      password:data.password,
      phoneNumber:data.phoneNumber,
      name:data.name
    }
    let newUser = await userQuery.insert(userData);
    return responseModel.successResponse("create user ", newUser);
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user not create", {}, errMessage);
  }
}

async function loginUser(data) {
  try {
    let currentOwner = await userQuery.get(data);
    if(!(currentOwner && currentOwner.authId)){
      return responseModel.failResponse("Invalid credentials", {},"Invalid credentials");
    }else{
      return responseModel.successResponse("login user success ", currentOwner);   
    }
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user not create", {}, errMessage);
  }
  
  
}

async function getUserProfile(req) {
  try {
    let currentOwner = await userQuery.findOne({_id:req.authenticationUser.authId});
    return responseModel.successResponse("get user profile ", currentOwner);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user profile not get", {}, errMessage);
  }
}
async function updateUserProfile(req) {
  try {
    let currentOwner = await userQuery.update(
      {_id:req.authenticationUser.authId},
      {"$set":{
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        profileUrl:req.body.profileUrl
      }
    });
    return responseModel.successResponse("update user profile ", currentOwner);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user profile not update", {}, errMessage);
  }
}

async function getAllUser(req) {
  try {
    let currentOwner = await userQuery.find({});
    return responseModel.successResponse("get user profile ", currentOwner);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user profile not get", {}, errMessage);
  }
}
async function getUserById(req) {
  try {
    let currentOwner = await userQuery.findOne({_id:req.params.userId});
    return responseModel.successResponse("get user profile ", currentOwner);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user profile not get", {}, errMessage);
  }
}

async function changePassword(req) {
  try {
    let hashPassword = new collection().generateHash(req.body.password)
    let currentEmail = await userQuery.update({_id:req.authenticationUser.authId},{
      "$set":{password:hashPassword}
    });
    return responseModel.successResponse("new password success ", currentEmail);
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("password not set", {}, errMessage);
  }
}

async function forgotPassword(req) {
  try {
    let currentEmail = await userQuery.findOne({email:req.body.email},{_id:1,email:1,password:0});
    if(currentEmail){
     // emailService.newPassword(currentEmail);
      return responseModel.successResponse("get email user success ",currentEmail['_id']);
    }else{
      return responseModel.failResponse("user not get email", {}, errMessage);
    }
    
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user not get email", {}, errMessage);
  }
}

async function newPassword(req) {
  try {
    let hashPassword = new collection().generateHash(req.body.password)
    let currentEmail = await userQuery.update({_id:req.body._id},{
      "$set":{password:hashPassword}
    });
    return responseModel.successResponse("new password success ", currentEmail);
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("password not set", {}, errMessage);
  }
}


async function userActive(req) {
  try {
    let currentOwner = await userQuery.update(
      {_id:req.body.userId},
      {"$set":{
        isActive:req.body.status
      }
    });
    return responseModel.successResponse("update user status ", currentOwner);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user status not update", {}, errMessage);
  }
}
async function deleteUser(req) {
  try {
    let deleteuser = await query.deleteMany(mongoose.model('user'),{_id:req.params.userId});
    return responseModel.successResponse("user delete ", deleteuser);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("user not delete", {}, errMessage);
  }
}

async function userDashboard(req){
  try {
    
    let userCount = await query.count(mongoose.model('user'),{});
    let eventCount = await query.count(mongoose.model('event'),{});

    let queryAg =[
      { $match: {type:"INCOME"} },
      { $group: { _id : null, sum : { $sum: "$price" } } }
    ];
    let balnaceCount = await query.aggregate(mongoose.model('balance'),queryAg);
    let totalCount ={
      users: userCount ? userCount : 0,
      events: eventCount ? eventCount : 0,
      balance: balnaceCount ? balnaceCount[0]['sum'] : 0
    }
    return responseModel.successResponse("get dashboard success ", totalCount);
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("dashboard not get", {}, errMessage);
  }
}
module.exports = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  getAllUser,
  changePassword,
  forgotPassword,
  newPassword,
  userDashboard,
  deleteUser,
  userActive
}