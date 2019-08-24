const express = require('express');
const bodyParser = require('body-parser')
const { mongoService } = require('./connection');

const fs = require('fs');
require('dotenv').config();

const port = process.env.PORT || 3001

const app = express();
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));
mongoService.connect();

const enableCORS = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.all("/*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  next();
});
app.use(enableCORS);

const models_path = __dirname + '/schema';
fs.readdirSync(models_path).forEach((file) => {
  if (~file.indexOf('.js')) require(models_path + '/' + file);
});
app.use(express.static(__dirname + '/public'));

app.use('/rest/account/', require('./routes/user'));
app.use('/rest/event/', require('./routes/event'));
app.use('/rest/complaint/', require('./routes/complaint'));
app.use('/rest/gallery/', require('./routes/gallery'));
app.use('/rest/balance/', require('./routes/balance'));
app.use('/rest/donate/', require('./routes/donate'));

app.listen(port, () => {
  console.log(`The PinjartGaneshaYuvak app is up on port ${port}`);
})