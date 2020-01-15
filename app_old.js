var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })
//CREATE EXPRESS APP
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES WILL GO HERE


app.get('/',function(req,res){
  res.sendFile(__dirname + '/public/index.html');
 
});

 

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})
var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
