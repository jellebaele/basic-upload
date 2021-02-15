const router = require("express").Router();
const uploadController = require("../controllers/uploadController");
const ImageModel = require("../models/Image");

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.post("/upload", uploadController.multipleUploads);

router.get("/uploads", (req, res) => {
  ImageModel.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("uploads.ejs", { items: items });
    }
  });
});

module.exports = router;
