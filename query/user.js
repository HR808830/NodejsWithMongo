
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { commonService } = require('../service');
let collection = mongoose.model('user');
let ObjectId = mongoose.mongo;

let insert = (data) => {
    return new Promise((resolve, reject) => {
        let authdata = {
            email: data.email,
            //password: new Buffer(data.password, 'base64').toString(),
            password: data.password,
            name: data.name,
            phoneNumber:data.phoneNumber
        };
        collection.find({ 'email': data.email }, (err, list) => {
            if (err) {
                return reject({ message: "DB query Failed" });
            } else {
                if (list.length) return reject({ message: "EmailId already register" });
                let account = new collection(authdata);

                account.password = account.generateHash(authdata.password);;
                account.save(authdata, (err, result) => {
                    if (err) return reject({ message: "DB Insert Failed" });
                    let insertRow = {
                        authId: result._id,
                        email: result.email,
                        authType:result.role

                    };
                    insertRow.authToken = jwt.sign(insertRow, process.env.configSecret, {
                        expiresIn: 1440 * 60 * 30 // expires in 24 hours
                    });
                    return resolve(insertRow);
                })
            }

        });
    })
};


let get = (query) => {
    return new Promise((resolve, reject) => {
        collection.find({ 'email': query.email }, (err, list) => {
            if (err) {
                return reject({ message: "DB query Failed" });
            } else {
                if (list.length == 0) return resolve({ message: "EmailID not match" });


                //let password = new Buffer(query.password, 'base64').toString();
                let password = query.password;
                if (list[0].validPassword(password)) {
                    let loginuser = {
                        authId: list[0]._id,
                        email: list[0].email,
                        authType:list[0].role
                    };
                    loginuser.authToken = jwt.sign(loginuser, process.env.configSecret, {
                        expiresIn: 1440 * 60 * 30 // expires in 24 hours
                    });
                    return resolve(loginuser);
                } else {
                    return resolve({ message: "Password not match" });
                }
            }
        });
    })
}

let update = (findBy,query) => {
    return new Promise((resolve, reject) => {
        collection.updateOne(findBy,query, (err, result) => {
            if (err) return reject({ message: "DB query Failed" });
            return resolve(result);
        });
    })
}

let find = (query) => {
    return new Promise((resolve, reject) => {
        collection.find(query, (err, list) => {
            if (err) return reject({ message: "DB query Failed" });
            return resolve(list);
        });
    })
}

let findOne = (query) => {
    return new Promise((resolve, reject) => {
        collection.findOne(query, (err, list) => {
            if (err) return reject({ message: "DB query Failed" });
            return resolve(list);
        });
    })
}

let aggregate = (query) => {
  return new Promise((resolve, reject) => {
    collection.aggregate(query).exec((err, list) => {
      if (err) return reject({ message: "DB query Failed" });
      return resolve(list);
    });
  })
}
module.exports = {
    insert,
    get,
    update,
    find,
    findOne,
    aggregate
}