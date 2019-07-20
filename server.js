const express = require("express");
const exhbs = require('express-handlebars');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();
require('./config/routes')(router);
app.use(express.static(__dirname + "/public"));
app.engine('handlebars', exhbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
extended: false
}));
app.use(router);

const mongoose = require("mongoose");




const db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';



mongoose.connect(db, err =>{
  if (err){
    console.log(err);
  }
  else{
    console.log('Mongo running properly')
  }
});




app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
