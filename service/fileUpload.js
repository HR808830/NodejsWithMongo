const multer = require('multer');   //FOR FILE UPLOAD
const fs = require('fs');

let storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    cb(null, file.originalname);
  }
});
let upload = multer({ //multer settings
  storage: storage
}).single('file');


let uploadfile = (req, res, next) => {
  let path = '';
  upload(req, res, function (err) {
    if (err) {
      return res.status(422).send("an Error occured");
    }
    let path = req.file.path;
    req.file = path;
    next();

  });
}

let base64fileUpload = (req,res,next)=>{
  let imagePath,base64Data;
  function myFunction(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
  }

  let randomNumber = myFunction(25, '#aA');
  var data = req.body.image.split(';');
  if (data[0] == "data:image/1") {
     imagePath = 'public/' + randomNumber + '.png';
     base64Data = req.body.image.replace(/^data:image\/1;base64,/, "");
  } else if (data[0] == "data:image/*") {
     base64 = data[2].split(",");
    base64Data = base64[1];
    var data = base64[1].substring(0, 8);
    if (data == "/9j/4AAQ") {
       imagePath = 'public/' + randomNumber + '.jpeg';
    } else {
       imagePath = 'public/' + randomNumber + '.png';
    }
  } else if (data[0] == "data:image/png") {
     imagePath = 'public/' + randomNumber + '.png';
     base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
  } else if (data[0] == "data:image/jpeg") {
     imagePath = 'public/' + randomNumber + '.jpeg';
     base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
  } else if (data[0] == "data:image/gif") {
    imagePath = 'public/' + randomNumber + '.gif';
     console.log("request file-------4----------",imagePath);
     base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
  }else {
    console.log("image invalid");
  }
  fs.writeFile(imagePath, base64Data, 'base64', function (err) {
    if (err) {
      return res.status(422).send({code:422,message:"an Error occured"});
    } else {
      let url = 'http:localhost:3001/';
      req.body.image =url +imagePath;
      next();
      // return res.status(200).send({code:200,url:imagePath.split('./images')[1]});
    }
  });
}

module.exports = {
  uploadfile,
  base64fileUpload
}