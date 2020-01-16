const express = require("express");
const cors = require("cors");
const XLSX = require('xlsx'),  formidable = require('formidable');
const bodyParser = require('body-parser');
const app = express();

const PORT = "8082" || process.env.PORT;



const FILE_PATH = 'uploads/';


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/add", function(req, res) {
    
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      if (!file.originalname.match(/\.(xls|xlsx)$/)) {
        return cb(new Error('Only Excel file are allowed.'), false);
       }
        const f = files[Object.keys(files)[0]];
        const workbook = XLSX.readFile(f.path);
        /* DO SOMETHING WITH workbook HERE */
        const sheet = workbook.Sheets['Channel_'+1+'_1 '];

        res.send({
            status: true,
            message: "workbook"
        });
    });
});
// add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
