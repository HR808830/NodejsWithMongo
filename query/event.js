
const mongoose = require('mongoose');
let collection = mongoose.model('event');

let insert = (data) => {
  return new Promise((resolve, reject) => {
    let event = new collection(data);
    event.save(data, (err, result) => {
      if (err) return reject({ message: "DB Insert Failed" });
      return resolve(result);
    })
  })
};


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
  find,
  findOne,
  aggregate
}