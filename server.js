const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const Image = require("./models/Image");
const cors = require("cors");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const match = ["image/png", "image/jpeg"];
    // Rare tekens eruit filteren!!!!
    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only .png/.jpeg files are accepted`;
      return cb(message, null);
    }

    let filename = `${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

mongoose.connect(
  "mongodb://localhost:27017/fileApi",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to db");
  }
);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" })
})

app.post("/api/images", upload.single("myfile"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const newImage = new Image({
    title: req.file.originalname,
    img: {
      path: req.file.path,
    },
    category: req.body.category
  });

  newImage.save();
  res.json({ image: newImage });
});

app.get("/api/images", (req, res) => {
  Image.find({}, (err, items) => {
    if (err) {
      console.log(error);
      res.status(500).send("error: ", error);
    } else {
      res.json(items);
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
