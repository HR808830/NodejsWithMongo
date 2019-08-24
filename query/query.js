
let insert = (collection, query) => {
    return new Promise((resolve, reject) => {
        let saveData = new collection(query);
        // collection.insert(query, (err, recordSaved) => {
        //     err ? reject(err) : resolve(recordSaved)
        // })
        saveData.save(query, (err, result) => {
          if (err) return reject({ message: "DB Insert Failed" });
          return resolve(result);
        })
    })
}


let find = (collection, query, additionalParameter) => {
   return new Promise((resolve, reject) => {
       additionalParameter == undefined ?
          collection.find(query, (err, queryResult) => {
               if (err) {
                   return reject({ message: "DB query Failed" });
               } else {
                   resolve(queryResult);
               }
          }) : 
          collection.find(query, additionalParameter,(err, queryResult) => {
               if (err) {
                   return reject({ message: "DB query Failed" });
               } else {
                   resolve(queryResult);
               }
          })
   })
}
let findOne = (collection, query, additionalParameter) => {
    return new Promise((resolve, reject) => {
        additionalParameter == undefined ?
            collection.findOne(query, (err, queryResult) => {
                if (err) {
                    return reject({ message: "DB query Failed" });
                } else {
                    resolve(queryResult);
                }
            }) : collection.findOne(query, additionalParameter, (err, queryResult) => {
                if (err) {
                    return reject({ message: "DB query Failed" });
                } else {
                    resolve(queryResult);
                }
            })
    })
}

let updateOne = (collection,findBy,query) => {
    return new Promise((resolve, reject) => {
        collection.updateOne(findBy,query, (err, result) => {
          err ? reject(err) : resolve(result)
        });
    })
}
let deleteMany = (collection, query) => {
    return new Promise((resolve, reject) => {
        collection.deleteMany(query,(err, deletedRecords) => {
            err ? reject(err) : resolve(deletedRecords)
        })
    })
}

let aggregate = (collection, query) => {
   return new Promise((resolve, reject) => {
       collection.aggregate(query, (err, queryResult) => {
           err ? reject(err) : resolve(queryResult)
       })
   })
}

let count = (collection, query) => {
  return new Promise((resolve, reject) => {
    collection.count(query, (err, queryResult) => {
      err ? reject(err) : resolve(queryResult)
    }).count();
  })
}



module.exports = {
  insert,
  find,
  findOne,
  updateOne,
  deleteMany,
  aggregate,
  count
}