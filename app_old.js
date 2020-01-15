const express = require("express");
const multer = require("multer");
const cors = require("cors");
var XLSX = require('xlsx'),  formidable = require('formidable');
const bodyParser = require('body-parser');
const app = express();

const PORT = "8082" || process.env.PORT;



const FILE_PATH = 'uploads/';
const fileFilter = (req, file, cb) => {
  // allow only "application/xls",
  //     "application/x-xls",
  if (!file.originalname.match(/\.(xls|xlsx)$/)) {
    return cb(new Error('Only Excel file are allowed.'), false);
  }
  cb(null, true);
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_PATH);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5000000
  }
});


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const avatar = req.file;
    // make sure file is available
    if (!avatar) {
      res.status(400).send({
        status: false,
        data: 'No file is selected.'
      });
    } else {
      // send response
      res.send({
        status: true,
        message: 'File is uploaded.',
        data: {
          name: avatar.originalname,
          size: avatar.size
        }
      });

    }

  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/add", function(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    const f = files[Object.keys(files)[0]];
    const workbook = XLSX.readFile(f.path);
    /* DO SOMETHING WITH workbook HERE */
    console.log(workbook);
    res.send({
      status: true,
      message: workbook
    });
  });
});
// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
