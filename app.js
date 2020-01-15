const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/xls",
    "application/x-xls",
    "image/jpeg",
    "image/jpg",
    "image/png"
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  dest: "./uploads",
  fileFilter,
  limits: {
    fileSize: 50000000
  }
});

const PORT = "8082" || process.env.PORT;

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("uploading a file");
  res.json({ file: req.file });
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: "Only Excel are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: "Allow file size is 5MB" });
    return;
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
