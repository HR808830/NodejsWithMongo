const mongoose = require('mongoose');
let collection = mongoose.model('balance');
const { responseModel } = require('../model');
const { query } = require('../query');
//mongoose.Types.ObjectId(id)
async function add(req) {
  try {
    let add = await query.insert(collection,{
      userId:req.body.userId,
      description:req.body.description,
      price:req.body.price,
      type:req.body.type
    });
    return responseModel.successResponse("create balance ", add);
  } catch (err) {
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("balance not create", {}, errMessage);
  }
}

async function getAllBalance(req) {
  try {
    let queryAg =[
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userList"
        }
      },
      {
         $unwind: {
           path: "$userList",
           preserveNullAndEmptyArrays: true
         }
       },
       {
         $project: {
           _id: 1,price:1,userId:1,description:1,type:1,createdAt:1,
            name: "$userList.name",
            profileUrl:"$userList.profileUrl"
             
      }   
      }
    ];
    let allBalance = await query.aggregate(collection,queryAg);
    return responseModel.successResponse("get balance ", allBalance);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("balance not get", {}, errMessage);
  }
}
async function getByIdBalance(req) {
  try {
    let allBalance = await query.find(collection,{});
    return responseModel.successResponse("get balance ", allBalance);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("balance not get", {}, errMessage);
  }
}
async function getBalanceUser(req) {
  try {
    let allBalance = await query.find(collection,{userId:req.params.userId});
    return responseModel.successResponse("get balance user", allBalance);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("balance not get user", {}, errMessage);
  }
}
async function deleteBalance(req) {
  try {
    let deletebalance = await query.deleteMany(collection,{_id:req.params.balanceId});
    return responseModel.successResponse("balance delete ", deletebalance);   
  } catch(err){
    errMessage = typeof err == 'string' ? err : err.message;
    return responseModel.failResponse("balance not delete", {}, errMessage);
  }
}
module.exports = {
  add,
  getAllBalance,
  getBalanceUser,
  getByIdBalance,
  deleteBalance
}